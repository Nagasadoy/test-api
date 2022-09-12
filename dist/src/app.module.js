"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const tag_module_1 = require("./tag/tag.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env'
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => {
                    return {
                        type: 'postgres',
                        host: process.env.POSTGRES_HOST,
                        username: process.env.POSTGRES_USER,
                        password: `${process.env.POSTGRESS_PASSWORD}`,
                        database: process.env.POSTGRES_DB,
                        port: Number(process.env.POSTGRESS_PORT),
                        entities: ['dist/**/*entity.js'],
                        autoLoadEntities: true,
                        logging: true,
                        synchronize: false
                    };
                },
            }),
            user_module_1.UserModule,
            tag_module_1.TagModule,
            auth_module_1.AuthModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map