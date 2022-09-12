import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { TokenDto } from './dto/token.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { TokenBlackList } from './entities/token.entity';
export declare class AuthService {
    private readonly tokenRepository;
    private userService;
    private jwtService;
    constructor(tokenRepository: Repository<TokenBlackList>, userService: UserService, jwtService: JwtService);
    signin(userDto: CreateUserDto): Promise<TokenDto>;
    login(loginDto: LoginDto): Promise<TokenDto>;
    logout(tokenValue: string): Promise<TokenBlackList>;
    checkTokenInBlackList(token: string): Promise<boolean>;
    refreshToken(user: User): Promise<TokenDto>;
    private generateToken;
}
