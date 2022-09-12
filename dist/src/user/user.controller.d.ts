import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { AddTagForUserDto } from './dto/add-tag-for-user.dto';
import { UserTagsDto } from './dto/user-tags.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findOne(user: User): Promise<GetUserDto>;
    update(updateUser: UpdateUserDto, authUser: User): Promise<GetUserDto>;
    delete(user: User, token: any): Promise<void>;
    addTagsForUser(user: User, dto: AddTagForUserDto): Promise<UserTagsDto>;
    deleteUserTag(user: User, id: number): Promise<UserTagsDto>;
    getTagsWhereUserIsCreator(user: User): Promise<UserTagsDto>;
}
