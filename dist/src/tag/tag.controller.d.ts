import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { User } from 'src/user/entities/user.entity';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import { GetTagByIdDto } from './dto/get-tag-by-id.dto';
import { GetTagDto } from './dto/get-tag.dto';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    create(createTagDto: CreateTagDto, user: User): Promise<GetTagDto>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<GetTagByIdDto>>;
    getById(id: number): Promise<GetTagByIdDto>;
    change(updateTag: UpdateTagDto, id: number, user: User): Promise<GetTagByIdDto>;
    delete(tagId: number, user: User): Promise<boolean>;
}
