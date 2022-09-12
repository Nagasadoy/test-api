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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTagByIdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetTagByIdDto {
    convertFromEntity(tag) {
        const dto = new GetTagByIdDto();
        dto.name = tag.name;
        dto.sortOrder = tag.sortOrder;
        dto.creator = {
            nickname: tag.user.nickname,
            uid: tag.user.uid
        };
        return dto;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Name', description: 'Название тэга' }),
    __metadata("design:type", String)
], GetTagByIdDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Сортировка' }),
    __metadata("design:type", Number)
], GetTagByIdDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Создатель' }),
    __metadata("design:type", Object)
], GetTagByIdDto.prototype, "creator", void 0);
exports.GetTagByIdDto = GetTagByIdDto;
//# sourceMappingURL=get-tag-by-id.dto.js.map