import { Tag } from "src/tag/entities/tag.entity";
export declare class User {
    uid: string;
    email: string;
    password: string;
    nickname: string;
    tags: Tag[];
}
