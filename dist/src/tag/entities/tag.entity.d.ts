import { User } from "src/user/entities/user.entity";
export declare class Tag {
    id: number;
    name: string;
    sortOrder: number;
    user: User;
    convertToGetDto(tag: any): void;
}
