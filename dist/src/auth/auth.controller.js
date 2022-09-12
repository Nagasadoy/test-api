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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const user_entity_1 = require("../user/entities/user.entity");
const validation_user_pipe_1 = require("../user/pipes/validation-user.pipe");
const user_decorator_1 = require("../user/user.decorator");
const auth_decorator_1 = require("./auth.decorator");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const token_dto_1 = require("./dto/token.dto");
const jwt_suth_guard_1 = require("./jwt-suth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signin(createUserDto) {
        return this.authService.signin(createUserDto);
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
    logout(token) {
        return this.authService.logout(token);
    }
    refreshToken(user) {
        return this.authService.refreshToken(user);
    }
};
__decorate([
    (0, common_1.Post)('signin'),
    (0, common_1.UsePipes)(validation_user_pipe_1.ValidationUser),
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Пользователь зарегистрирован',
        type: token_dto_1.TokenDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Авторизация' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Пользователь авторизован',
        type: token_dto_1.TokenDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({ summary: 'Выход' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_suth_guard_1.JwtAuthGuard),
    __param(0, (0, auth_decorator_1.Auth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновление токена' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_suth_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Авторизация/регистрация'),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map