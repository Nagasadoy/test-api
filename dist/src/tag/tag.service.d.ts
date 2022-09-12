import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagByIdDto } from './dto/get-tag-by-id.dto';
import { GetTagDto } from './dto/get-tag.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
export declare class TagService {
    private readonly tagRepository;
    private readonly userService;
    constructor(tagRepository: Repository<Tag>, userService: UserService);
    create(createTagDto: CreateTagDto, uidCreator: string): Promise<GetTagDto>;
    getById(id: number): Promise<GetTagByIdDto>;
    getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<GetTagByIdDto>>;
    change(updateTag: UpdateTagDto, tagId: number, uidCreator: string): Promise<GetTagByIdDto>;
    delete(creatorId: string, tagId: number): Promise<boolean>;
    userIsCreator(uidCreator: string, uidTag: string): Promise<void>;
    nameIsTaken(name: string): Promise<void>;
}
