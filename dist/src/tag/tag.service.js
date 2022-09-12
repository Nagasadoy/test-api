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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("typeorm");
const get_tag_by_id_dto_1 = require("./dto/get-tag-by-id.dto");
const get_tag_dto_1 = require("./dto/get-tag.dto");
const page_meta_dto_1 = require("./dto/page-meta.dto");
const page_dto_1 = require("./dto/page.dto");
const tag_entity_1 = require("./entities/tag.entity");
let TagService = class TagService {
    constructor(tagRepository, userService) {
        this.tagRepository = tagRepository;
        this.userService = userService;
    }
    async create(createTagDto, uidCreator) {
        await this.nameIsTaken(createTagDto.name);
        let tag = await this.tagRepository.create(createTagDto);
        const user = await this.userService.findUserByUid(uidCreator);
        tag.user = user;
        tag = await this.tagRepository.save(tag);
        const dto = new get_tag_dto_1.GetTagDto();
        return dto.convertFromEntity(tag);
    }
    async getById(id) {
        const tag = await this.tagRepository.findOne({
            relations: ['user'],
            where: { id: id }
        });
        if (!tag) {
            throw new common_1.HttpException(`По id=${id} тэг не найден`, common_1.HttpStatus.NOT_FOUND);
        }
        const dto = new get_tag_by_id_dto_1.GetTagByIdDto();
        return dto.convertFromEntity(tag);
    }
    async getAll(pageOptionsDto) {
        const skip = (pageOptionsDto.page - 1) * pageOptionsDto.pageSize;
        const queryBuilder = this.tagRepository.createQueryBuilder('tag');
        queryBuilder
            .innerJoinAndSelect('tag.user', 'user.uid')
            .orderBy("tag.name", pageOptionsDto.sortByName)
            .addOrderBy("tag.sortOrder", pageOptionsDto.sortByOrder)
            .skip(skip)
            .take(pageOptionsDto.pageSize);
        console.log(queryBuilder.getQuery());
        const totalCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({
            page: pageOptionsDto.page,
            pageSize: pageOptionsDto.pageSize,
            quantity: totalCount
        });
        const dtoTags = entities.map(el => {
            const dto = new get_tag_by_id_dto_1.GetTagByIdDto();
            return dto.convertFromEntity(el);
        });
        return new page_dto_1.PageDto(dtoTags, pageMetaDto);
    }
    async change(updateTag, tagId, uidCreator) {
        let tag = await this.tagRepository.findOne({
            relations: ['user'],
            where: { id: tagId }
        });
        await this.userIsCreator(uidCreator, tag.user.uid);
        if (tag.name != updateTag.name) {
            await this.nameIsTaken(updateTag.name);
        }
        tag.name = updateTag.name;
        tag.sortOrder = updateTag.sortOrder;
        tag = await this.tagRepository.save(tag);
        const dto = new get_tag_by_id_dto_1.GetTagByIdDto();
        return dto.convertFromEntity(tag);
    }
    async delete(creatorId, tagId) {
        let tag = await this.tagRepository.findOne({
            relations: ['user'],
            where: { id: tagId }
        });
        await this.userIsCreator(creatorId, tag.user.uid);
        await this.tagRepository.delete(tagId);
        return true;
    }
    async userIsCreator(uidCreator, uidTag) {
        if (uidCreator != uidTag) {
            throw new common_1.HttpException(`Только создатель может изменять или удалять тэг`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async nameIsTaken(name) {
        const tag = await this.tagRepository.findOneBy({ name: name });
        if (tag) {
            throw new common_1.HttpException(`Имя: ${name} уже занято`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map