import { Tag } from "src/tag/entities/tag.entity";
import { User } from "../entities/user.entity";
export declare class GetUserDto {
    email: string;
    nickname: string;
    tags: Tag[];
    convertFromEntity(user: User): GetUserDto;
}
