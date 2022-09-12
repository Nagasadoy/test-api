"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRESS_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    port: configService.get('POSTGRESS_PORT'),
    entities: ['dist/**/*entity.js'],
    migrations: ['dist/migrations/*.js']
});
//# sourceMappingURL=typeOrm.config.js.map