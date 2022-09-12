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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./entities/user.entity");
const jwt_suth_guard_1 = require("../auth/jwt-suth.guard");
const user_decorator_1 = require("./user.decorator");
const validation_user_pipe_1 = require("./pipes/validation-user.pipe");
const get_user_dto_1 = require("./dto/get-user.dto");
const auth_decorator_1 = require("../auth/auth.decorator");
const add_tag_for_user_dto_1 = require("./dto/add-tag-for-user.dto");
const user_tags_dto_1 = require("./dto/user-tags.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findOne(user) {
        const findUser = await this.userService.findUserByUid(user.uid);
        const dto = new get_user_dto_1.GetUserDto();
        return dto.convertFromEntity(findUser);
    }
    update(updateUser, authUser) {
        return this.userService.update(updateUser, authUser.uid);
    }
    delete(user, token) {
        return this.userService.deleteUser(user.uid, token);
    }
    addTagsForUser(user, dto) {
        return this.userService.addTagsForUser(dto.tags, user);
    }
    deleteUserTag(user, id) {
        return this.userService.deleteUserTag(id, user);
    }
    getTagsWhereUserIsCreator(user) {
        return this.userService.getTagsWhereUserIsCreator(user);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение авторизованного пользователя' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Авторизованный пользователь',
        type: get_user_dto_1.GetUserDto,
    }),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.UsePipes)(validation_user_pipe_1.ValidationUser),
    (0, swagger_1.ApiOperation)({ summary: 'Обновление авторизованного пользователя' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Обновленный пользователь',
        type: get_user_dto_1.GetUserDto,
    }),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Удаление авторизованного пользователя' }),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, auth_decorator_1.Auth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('/tag'),
    (0, swagger_1.ApiOperation)({ summary: 'Добавление новых тэгов для пользователя' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Тэги пользователя',
        type: user_tags_dto_1.UserTagsDto,
    }),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, add_tag_for_user_dto_1.AddTagForUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addTagsForUser", null);
__decorate([
    (0, common_1.Delete)('/tag/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Удаление тэга пользователя' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Тэги пользователя',
        type: user_tags_dto_1.UserTagsDto,
    }),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserTag", null);
__decorate([
    (0, common_1.Get)('tag/my'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение тэгов пользователя' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Тэги пользователя',
        type: user_tags_dto_1.UserTagsDto,
    }),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getTagsWhereUserIsCreator", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('Пользователи'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_suth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map