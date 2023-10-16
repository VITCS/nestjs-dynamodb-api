"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const { PORT = 3000 } = process.env;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(PORT);
    common_1.Logger.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map