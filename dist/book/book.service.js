"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
require("dotenv/config");
const dynamoDBClient_1 = require("../aws-config/dynamoDBClient");
const { TABLE_NAME } = process.env;
let BookService = class BookService {
    async create(createBookDto) {
        console.log("Table name:; ", TABLE_NAME);
        await (0, dynamoDBClient_1.dynamoDBClient)()
            .put({
            TableName: TABLE_NAME,
            Item: {
                bookId: (0, uuid_1.v4)(),
                title: createBookDto.title,
                author: createBookDto.author,
                publicationYear: createBookDto.publicationYear,
                createAt: new Date().toLocaleString()
            },
        })
            .promise();
        return {
            message: "Item successfully Inserted",
        };
    }
    async createBulk(createBookDto) {
        const recordsWithUUID = createBookDto.map((record) => (Object.assign(Object.assign({}, record), { bookId: (0, uuid_1.v4)(), timestamp: new Date().toLocaleString() })));
        const params = {
            RequestItems: {
                [TABLE_NAME]: recordsWithUUID.map((record) => ({
                    PutRequest: {
                        Item: record
                    },
                })),
            },
        };
        try {
            await (0, dynamoDBClient_1.dynamoDBClient)().batchWrite(params).promise();
            console.log(`Successfully inserted ${createBookDto.length} records into ${TABLE_NAME}`);
            return {
                message: `Successfully inserted ${createBookDto.length} records into ${TABLE_NAME})`
            };
        }
        catch (error) {
            console.error('Error inserting records into DynamoDB:', error);
        }
    }
    async findAll() {
        const results = await (0, dynamoDBClient_1.dynamoDBClient)()
            .scan({
            TableName: TABLE_NAME,
        })
            .promise();
        console.log(`Successfully inserted ${results.Items.length} records into ${TABLE_NAME}`);
        return results.Items;
    }
    async findOne(bookId) {
        console.log(bookId);
        const result = await (0, dynamoDBClient_1.dynamoDBClient)()
            .get({
            TableName: TABLE_NAME,
            Key: { bookId: bookId },
        })
            .promise();
        return result.Item;
    }
    async update(bookId, updateBookDto) {
        const updated = await (0, dynamoDBClient_1.dynamoDBClient)()
            .update({
            TableName: TABLE_NAME,
            Key: { bookId },
            UpdateExpression: 'set #title = :title, author = :author, publicationYear = :publicationYear',
            ExpressionAttributeNames: {
                '#title': 'title',
            },
            ExpressionAttributeValues: {
                ':title': updateBookDto.title,
                ':author': updateBookDto.author,
                ':publicationYear': updateBookDto.publicationYear,
            },
            ReturnValues: 'ALL_NEW',
        })
            .promise();
        return updated.Attributes;
    }
    async remove(bookId) {
        return await (0, dynamoDBClient_1.dynamoDBClient)()
            .delete({
            TableName: TABLE_NAME,
            Key: { bookId },
        })
            .promise();
    }
    async removeBulk(createBookDto) {
        const deleteRequests = createBookDto.map((key) => ({
            DeleteRequest: {
                Key: key,
            },
        }));
        const params = {
            RequestItems: {
                [TABLE_NAME]: deleteRequests,
            },
        };
        try {
            await (0, dynamoDBClient_1.dynamoDBClient)().batchWrite(params).promise();
            console.log(`Successfully deleted ${createBookDto.length} records from ${TABLE_NAME}`);
        }
        catch (error) {
            console.error('Error deleting records from DynamoDB:', error);
        }
    }
    async paginateRecords(tableName, pageSize, startKey) {
        console.log('inside service:: ', pageSize, startKey, tableName);
        const keyConditionExpression = 'bookId = :bookId';
        const params = {
            TableName: tableName,
            Limit: pageSize,
            KeyConditionExpression: keyConditionExpression,
            ExclusiveStartKey: {
                ':bookId': 'd3e55167-e624-489e-b149-26724906751a' || null,
            },
        };
        try {
            const result = await (0, dynamoDBClient_1.dynamoDBClient)().query(params).promise();
            const { Items, LastEvaluatedKey } = result;
            console.log('result pagination service:: ', result);
            return {
                items: Items,
                lastEvaluatedKey: LastEvaluatedKey || null,
            };
        }
        catch (error) {
            console.error('Error paginating records from DynamoDB:', error);
            throw error;
        }
    }
};
BookService = __decorate([
    (0, common_1.Injectable)()
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map