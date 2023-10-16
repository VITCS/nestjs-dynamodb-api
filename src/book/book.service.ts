import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import 'dotenv/config';
import { dynamoDBClient } from '../aws-config/dynamoDBClient';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { DynamoDB } from 'aws-sdk';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const { TABLE_NAME } = process.env;

@Injectable()
export class BookService {
  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async create(createBookDto: CreateBookDto) {
    console.log("Table name:; ", TABLE_NAME)

    await dynamoDBClient()
      .put({
        TableName: TABLE_NAME,
        Item: {
          bookId: uuid(),
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

  async createBulk(createBookDto: CreateBookDto[]) {

    const recordsWithUUID = createBookDto.map((record) => ({
      ...record,
      bookId: uuid(), // Generate a UUID for each record
      timestamp: new Date().toLocaleString()
    }));

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
      await dynamoDBClient().batchWrite(params).promise();
      console.log(`Successfully inserted ${createBookDto.length} records into ${TABLE_NAME}`);
      return {
        message: `Successfully inserted ${createBookDto.length} records into ${TABLE_NAME})`
      };
    } catch (error) {
      console.error('Error inserting records into DynamoDB:', error);
    }
  }


  // -- exponential backoff algorithm
  // async createBulk(createBookDto: CreateBookDto[]) {

  //   let currentRetry = 0;
  //   let delay = 200; // Initial delay in milliseconds
  //   let maxRetries = 5
  //   const recordsWithUUID = createBookDto.map((record) => ({
  //     ...record,
  //     bookId: uuid(), // Generate a UUID for each record
  //     timestamp: new Date().toLocaleString()
  //   }));

  //   const params = {
  //     RequestItems: {
  //       [TABLE_NAME]: recordsWithUUID.map((record) => ({
  //         PutRequest: {
  //           Item: record
  //         },
  //       })),
  //     },
  //   };
  //   while (currentRetry < maxRetries) {
  //     try {
  //       await dynamoDBClient().batchWrite(params).promise();
  //       console.log(`Successfully inserted ${createBookDto.length} records into ${TABLE_NAME}`);
  //     } catch (error) {
  //       console.error('Error inserting records into DynamoDB:', error);

  //       delay = Math.pow(2, currentRetry) * 200; // Adjust the multiplier and initial delay as needed
  //       console.log(`Retrying in ${delay} milliseconds...`);
  //       await new Promise((resolve) => setTimeout(resolve, delay)); // Wait for the specified delay

  //       currentRetry++;
  //     }
  //   }
  //   if (currentRetry === maxRetries) {
  //     console.error('Max retries reached. Batch write operation failed.');
  //   }
  // }

  async findAll() {
    const results = await dynamoDBClient()
      .scan({
        TableName: TABLE_NAME,
      })
      .promise();
    console.log(`Successfully inserted ${results.Items.length} records into ${TABLE_NAME}`);
    return results.Items;
  }

  async findOne(bookId: string) {
    console.log(bookId);
    const result = await dynamoDBClient()
      .get({
        TableName: TABLE_NAME,
        Key: { bookId: bookId },

      })
      .promise();

    return result.Item;
  }

  async update(bookId: string, updateBookDto: UpdateBookDto) {
    const updated = await dynamoDBClient()
      .update({
        TableName: TABLE_NAME,
        Key: { bookId },
        UpdateExpression:
          'set #title = :title, author = :author, publicationYear = :publicationYear',
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

  async remove(bookId: string) {
    return await dynamoDBClient()
      .delete({
        TableName: TABLE_NAME,
        Key: { bookId },
      })
      .promise();
  }

  async removeBulk(createBookDto: CreateBookDto[]) {
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
      await dynamoDBClient().batchWrite(params).promise();
      console.log(`Successfully deleted ${createBookDto.length} records from ${TABLE_NAME}`);
    } catch (error) {
      console.error('Error deleting records from DynamoDB:', error);
    }
  }

  async paginateRecords(tableName: string, pageSize: number, startKey?: any) {
    console.log('inside service:: ', pageSize, startKey, tableName)
    const keyConditionExpression = 'bookId = :bookId';
    const params: DynamoDB.DocumentClient.QueryInput = {
      TableName: tableName,
      Limit: pageSize,
      KeyConditionExpression: keyConditionExpression,
      ExclusiveStartKey: {
        ':bookId': 'd3e55167-e624-489e-b149-26724906751a' || null,
      },
    };
    try {
      const result = await dynamoDBClient().query(params).promise();
      const { Items, LastEvaluatedKey } = result;
      console.log('result pagination service:: ', result)
      return {
        items: Items,
        lastEvaluatedKey: LastEvaluatedKey || null,
      };
    } catch (error) {
      console.error('Error paginating records from DynamoDB:', error);
      throw error;
    }
  }

}
