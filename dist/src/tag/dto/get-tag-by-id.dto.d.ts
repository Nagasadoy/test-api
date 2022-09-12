import { Tag } from "../entities/tag.entity";
export declare class GetTagByIdDto {
    name: string;
    sortOrder: number;
    creator: {
        nickname: string;
        uid: string;
    };
    convertFromEntity(tag: Tag): GetTagByIdDto;
}
