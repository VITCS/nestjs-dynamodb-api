"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const book_dto_1 = require("./book.dto");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async create(createBookDto) {
        return await this.bookService.create(createBookDto);
    }
    async createBulk(createBookDto) {
        return await this.bookService.createBulk(createBookDto);
    }
    async findAll() {
        return await this.bookService.findAll();
    }
    async findOne(requestBody) {
        const bookId = requestBody.bookId;
        return await this.bookService.findOne(bookId);
    }
    async update(bookId, updateBookDto) {
        return await this.bookService.update(bookId, updateBookDto);
    }
    async remove(bookId) {
        return await this.bookService.remove(bookId);
    }
    async removeBulk(createBookDto) {
        await this.bookService.removeBulk(createBookDto);
        return { message: 'Records deleted successfully' };
    }
    async paginateRecords(paginationParams) {
        try {
            const { tableName, pageSize, startKey } = paginationParams;
            const parsedPageSize = parseInt(pageSize.toString(), 10);
            const result = await this.bookService.paginateRecords(tableName, parsedPageSize, startKey);
            console.log('result pagination:  ', result);
            return result;
        }
        catch (error) {
            return { error: 'Error paginating records' };
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/insert-bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "createBulk", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/bookId'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/bulk-delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "removeBulk", null);
__decorate([
    (0, common_1.Post)('/paginate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "paginateRecords", null);
BookController = __decorate([
    (0, common_1.Controller)('book'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map