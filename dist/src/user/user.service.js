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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcryptjs = require("bcryptjs");
const get_user_dto_1 = require("./dto/get-user.dto");
const tag_entity_1 = require("../tag/entities/tag.entity");
const user_tags_dto_1 = require("./dto/user-tags.dto");
let UserService = class UserService {
    constructor(userRepository, tagRepository) {
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }
    async findAll() {
        const users = this.userRepository.find({ relations: ['tags'] });
        return users;
    }
    async findUserByUid(uid) {
        const user = await this.userRepository.findOne({
            relations: ['tags'],
            where: { uid: uid }
        });
        if (!user) {
            throw new common_1.HttpException('Пользователя не существует', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async update(updateUserDto, uid) {
        const user = await this.userRepository.findOneBy({ uid: uid });
        if (!user) {
            throw new common_1.HttpException('Пользователя не существует', common_1.HttpStatus.NOT_FOUND);
        }
        let existingUser = await this.findUserByEmail(updateUserDto.email);
        if (existingUser && existingUser.uid != user.uid) {
            throw new common_1.HttpException('Пользователь с таким email уже существует', common_1.HttpStatus.BAD_REQUEST);
        }
        existingUser = await this.findUserByNickname(updateUserDto.nickname);
        if (existingUser && existingUser.uid != user.uid) {
            throw new common_1.HttpException('Пользователь с таким nickname уже существует', common_1.HttpStatus.BAD_REQUEST);
        }
        if (updateUserDto.password) {
            updateUserDto.password = await this.hashPassword(updateUserDto.password);
        }
        const dto = new get_user_dto_1.GetUserDto();
        return dto.convertFromEntity(await this.userRepository.save(Object.assign(Object.assign({}, user), updateUserDto)));
    }
    async createUser(createUser) {
        createUser.password = await this.hashPassword(createUser.password);
        const user = await this.userRepository.create(createUser);
        return await this.userRepository.save(user);
    }
    async deleteUser(uid, token) {
        await this.userRepository.delete({ uid: uid });
    }
    async findUserByEmail(email) {
        const user = await this.userRepository.findOneBy({ email: email });
        return user;
    }
    async findUserByNickname(nickname) {
        const user = await this.userRepository.findOneBy({ nickname: nickname });
        return user;
    }
    async addTagsForUser(tags, user) {
        const tagEntities = [];
        for (let i = 0; i < tags.length; i++) {
            const tagId = tags[i];
            const tag = await this.tagRepository.findOneBy({ id: tagId });
            if (!tag) {
                throw new common_1.HttpException(`Тэга с id=${tagId} не существует`, common_1.HttpStatus.BAD_REQUEST);
            }
            tagEntities.push(tag);
        }
        let userEntity = await this.userRepository.findOne({ relations: ['tags'], where: { uid: user.uid } });
        for (let i = 0; i < tagEntities.length; i++) {
            userEntity.tags.push(tagEntities[i]);
        }
        userEntity = await this.userRepository.save(userEntity);
        const dto = new user_tags_dto_1.UserTagsDto(userEntity.tags);
        return dto;
    }
    async deleteUserTag(tagId, user) {
        const userEntity = await this.userRepository.findOne({ relations: ['tags'], where: { uid: user.uid } });
        const resultTags = userEntity.tags.filter(t => t.id != tagId);
        console.log(resultTags);
        userEntity.tags = resultTags;
        await this.userRepository.save(userEntity);
        const dto = new user_tags_dto_1.UserTagsDto(userEntity.tags);
        return dto;
    }
    async getTagsWhereUserIsCreator(user) {
        const queryBuilder = this.tagRepository.createQueryBuilder('tag');
        queryBuilder.where('tag.user=:creator', { creator: user.uid });
        const { entities } = await queryBuilder.getRawAndEntities();
        const dto = new user_tags_dto_1.UserTagsDto(entities);
        return dto;
    }
    async hashPassword(password, salt = 5) {
        const hashPassword = await bcryptjs.hash(password, salt);
        return hashPassword;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map