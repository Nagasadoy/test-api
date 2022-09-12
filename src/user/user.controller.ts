import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, Put, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-suth.guard';
import { AuthUser } from './user.decorator';
import { ValidationUser } from './pipes/validation-user.pipe'; 
import { GetUserDto } from './dto/get-user.dto';
import { Auth } from 'src/auth/auth.decorator';
import { AddTagForUserDto } from './dto/add-tag-for-user.dto';
import { UserTagsDto } from './dto/user-tags.dto';

@ApiTags('Пользователи')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Получение авторизованного пользователя' })
    @ApiOkResponse({
        description: 'Авторизованный пользователь',
        type: GetUserDto,
    })
    @Get()
    async findOne(@AuthUser() user: User): Promise<GetUserDto> {
        const findUser = await this.userService.findUserByUid(user.uid)
        const dto = new GetUserDto();
        return dto.convertFromEntity(findUser);
    }

    @UsePipes(ValidationUser)
    @ApiOperation({ summary: 'Обновление авторизованного пользователя' })
    @ApiOkResponse({
        description: 'Обновленный пользователь',
        type: GetUserDto,
    })
    @Put()
    update(@Body() updateUser: UpdateUserDto, @AuthUser() authUser: User): Promise<GetUserDto> {
        return this.userService.update(updateUser, authUser.uid);
    }

    @Delete()
    @ApiOperation({ summary: 'Удаление авторизованного пользователя' })
    delete(@AuthUser() user: User, @Auth() token){
        return this.userService.deleteUser(user.uid, token);
    }

    @Post('/tag')
    @ApiOperation({ summary: 'Добавление новых тэгов для пользователя' })
    @ApiOkResponse({
        description: 'Тэги пользователя',
        type: UserTagsDto,
    })
    addTagsForUser(@AuthUser() user: User, @Body() dto: AddTagForUserDto): Promise<UserTagsDto>{
        return this.userService.addTagsForUser(dto.tags, user);
    }

    @Delete('/tag/:id')
    @ApiOperation({ summary: 'Удаление тэга пользователя' })
    @ApiOkResponse({
        description: 'Тэги пользователя',
        type: UserTagsDto,
    })
    deleteUserTag(@AuthUser() user: User, @Param('id') id: number): Promise<UserTagsDto>{
        return this.userService.deleteUserTag(id, user);
    }

    @Get('tag/my')
    @ApiOperation({ summary: 'Получение тэгов пользователя' })
    @ApiOkResponse({
        description: 'Тэги пользователя',
        type: UserTagsDto,
    })
    getTagsWhereUserIsCreator(@AuthUser() user: User): Promise<UserTagsDto>{
        return this.userService.getTagsWhereUserIsCreator(user);
    }
}
