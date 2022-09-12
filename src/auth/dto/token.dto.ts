import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
    @ApiProperty({example: 'token', description: 'токен'})
    token: string;
    @ApiProperty({example: '1800', description: 'время жизни токена'})
    expire: number;
}