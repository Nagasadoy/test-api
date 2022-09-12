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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./tag.service");
const create_tag_dto_1 = require("./dto/create-tag.dto");
const update_tag_dto_1 = require("./dto/update-tag.dto");
const jwt_suth_guard_1 = require("../auth/jwt-suth.guard");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../user/user.decorator");
const user_entity_1 = require("../user/entities/user.entity");
const page_options_dto_1 = require("./dto/page-options.dto");
const page_dto_1 = require("./dto/page.dto");
const get_tag_by_id_dto_1 = require("./dto/get-tag-by-id.dto");
const get_tag_dto_1 = require("./dto/get-tag.dto");
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    create(createTagDto, user) {
        return this.tagService.create(createTagDto, user.uid);
    }
    findAll(pageOptionsDto) {
        return this.tagService.getAll(pageOptionsDto);
    }
    getById(id) {
        return this.tagService.getById(id);
    }
    change(updateTag, id, user) {
        return this.tagService.change(updateTag, id, user.uid);
    }
    delete(tagId, user) {
        return this.tagService.delete(user.uid, tagId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создание нового тэга' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Новый тэг',
        type: get_tag_dto_1.GetTagDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_dto_1.CreateTagDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех тэгов с пагинацией' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Список всех тэгов',
        type: (page_dto_1.PageDto),
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение тэга по id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Список всех тэгов',
        type: get_tag_by_id_dto_1.GetTagByIdDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновление тэга по id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Обновление тэга',
        type: get_tag_by_id_dto_1.GetTagByIdDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_tag_dto_1.UpdateTagDto, Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "change", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Удаление тэга по id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "delete", null);
TagController = __decorate([
    (0, swagger_1.ApiTags)('Тэги'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_suth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tag'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map