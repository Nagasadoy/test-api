"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcryptjs = require("bcryptjs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const token_entity_1 = require("./entities/token.entity");
let AuthService = class AuthService {
    constructor(tokenRepository, userService, jwtService) {
        this.tokenRepository = tokenRepository;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signin(userDto) {
        let candidate = await this.userService.findUserByEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException('Пользователь с таким email уже существует', common_1.HttpStatus.BAD_REQUEST);
        }
        candidate = await this.userService.findUserByNickname(userDto.nickname);
        if (candidate) {
            throw new common_1.HttpException('Пользователь с таким nickname уже существует', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.createUser(Object.assign(Object.assign({}, userDto), { password: userDto.password }));
        return this.generateToken(user);
    }
    async login(loginDto) {
        const user = await this.userService.findUserByNickname(loginDto.nickname);
        if (!user) {
            throw new common_1.HttpException('Пользователь с таким nickname не существует', common_1.HttpStatus.NOT_FOUND);
        }
        const isMatch = await bcryptjs.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new common_1.HttpException('Неправильный пароль!', common_1.HttpStatus.NOT_FOUND);
        }
        return this.generateToken(user);
    }
    async logout(tokenValue) {
        const token = await this.tokenRepository.create({ value: tokenValue });
        return await this.tokenRepository.save(token);
    }
    async checkTokenInBlackList(token) {
        const verifyToken = await this.tokenRepository.findOneBy({ value: token });
        if (!verifyToken) {
            return false;
        }
        return true;
    }
    async refreshToken(user) {
        return this.generateToken(user);
    }
    async generateToken(user) {
        const paylaod = { email: user.email, uid: user.uid, nickname: user.nickname };
        const tokenLifeTime = 1800;
        const tokenDto = {
            token: this.jwtService.sign(paylaod, { expiresIn: tokenLifeTime }),
            expire: tokenLifeTime
        };
        return tokenDto;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(token_entity_1.TokenBlackList)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map