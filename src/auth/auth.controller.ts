import { Body, Controller, Post, Res, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response, response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { ValidationUser } from 'src/user/pipes/validation-user.pipe';
import { AuthUser } from 'src/user/user.decorator';
import { Auth } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { JwtAuthGuard } from './jwt-suth.guard';

@ApiTags('Авторизация/регистрация')
@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    @UsePipes(ValidationUser)
    @ApiOperation({ summary: 'Регистрация' })
    @ApiCreatedResponse({
        description: 'Пользователь зарегистрирован',
        type: TokenDto,
    })
    signin(@Body() createUserDto: CreateUserDto) {
        return this.authService.signin(createUserDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Авторизация' })
    @ApiCreatedResponse({
        description: 'Пользователь авторизован',
        type: TokenDto,
    })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    @ApiOperation({ summary: 'Выход' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    logout(@Auth() token) {
        return this.authService.logout(token);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Обновление токена' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    refreshToken(@AuthUser() user: User) {
        return this.authService.refreshToken(user);
    }
}
