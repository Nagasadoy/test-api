import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { Tag } from 'src/tag/entities/tag.entity';
import { UserTagsDto } from './dto/user-tags.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly tagRepository;
    constructor(userRepository: Repository<User>, tagRepository: Repository<Tag>);
    findAll(): Promise<User[]>;
    findUserByUid(uid: string): Promise<User>;
    update(updateUserDto: UpdateUserDto, uid: string): Promise<GetUserDto>;
    createUser(createUser: CreateUserDto): Promise<User>;
    deleteUser(uid: string, token: string): Promise<void>;
    findUserByEmail(email: string): Promise<User>;
    findUserByNickname(nickname: string): Promise<User>;
    addTagsForUser(tags: number[], user: User): Promise<UserTagsDto>;
    deleteUserTag(tagId: number, user: User): Promise<UserTagsDto>;
    getTagsWhereUserIsCreator(user: User): Promise<UserTagsDto>;
    private hashPassword;
}
