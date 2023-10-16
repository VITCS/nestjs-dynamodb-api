import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    create(createBookDto: CreateBookDto): Promise<{
        message: string;
    }>;
    createBulk(createBookDto: CreateBookDto[]): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("aws-sdk/clients/dynamodb").DocumentClient.ItemList>;
    findOne(requestBody: any): Promise<import("aws-sdk/clients/dynamodb").DocumentClient.AttributeMap>;
    update(bookId: string, updateBookDto: UpdateBookDto): Promise<import("aws-sdk/clients/dynamodb").DocumentClient.AttributeMap>;
    remove(bookId: string): Promise<import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/dynamodb").DocumentClient.DeleteItemOutput, import("aws-sdk").AWSError>>;
    removeBulk(createBookDto: CreateBookDto[]): Promise<{
        message: string;
    }>;
    paginateRecords(paginationParams: any): Promise<{
        items: import("aws-sdk/clients/dynamodb").DocumentClient.ItemList;
        lastEvaluatedKey: import("aws-sdk/clients/dynamodb").DocumentClient.Key;
    } | {
        error: string;
    }>;
}
