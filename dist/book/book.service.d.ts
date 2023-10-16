import 'dotenv/config';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { DynamoDB } from 'aws-sdk';
export declare class BookService {
    create(createBookDto: CreateBookDto): Promise<{
        message: string;
    }>;
    createBulk(createBookDto: CreateBookDto[]): Promise<{
        message: string;
    }>;
    findAll(): Promise<DynamoDB.DocumentClient.ItemList>;
    findOne(bookId: string): Promise<DynamoDB.DocumentClient.AttributeMap>;
    update(bookId: string, updateBookDto: UpdateBookDto): Promise<DynamoDB.DocumentClient.AttributeMap>;
    remove(bookId: string): Promise<import("aws-sdk/lib/request").PromiseResult<DynamoDB.DocumentClient.DeleteItemOutput, import("aws-sdk").AWSError>>;
    removeBulk(createBookDto: CreateBookDto[]): Promise<void>;
    paginateRecords(tableName: string, pageSize: number, startKey?: any): Promise<{
        items: DynamoDB.DocumentClient.ItemList;
        lastEvaluatedKey: DynamoDB.DocumentClient.Key;
    }>;
}
