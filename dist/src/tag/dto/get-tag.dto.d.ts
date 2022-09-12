import { Tag } from "../entities/tag.entity";
export declare class GetTagDto {
    id: number;
    name: string;
    sortOrder: number;
    convertFromEntity(tag: Tag): GetTagDto;
}
