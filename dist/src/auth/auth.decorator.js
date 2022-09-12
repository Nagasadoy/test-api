"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
exports.Auth = (0, common_1.createParamDecorator)((data, req) => {
    return req.switchToHttp().getRequest().token;
});
//# sourceMappingURL=auth.decorator.js.map