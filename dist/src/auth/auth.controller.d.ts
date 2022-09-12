import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(createUserDto: CreateUserDto): Promise<TokenDto>;
    login(loginDto: LoginDto): Promise<TokenDto>;
    logout(token: any): Promise<import("./entities/token.entity").TokenBlackList>;
    refreshToken(user: User): Promise<TokenDto>;
}
