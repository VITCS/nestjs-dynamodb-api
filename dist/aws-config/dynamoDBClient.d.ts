import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';
export declare const dynamoDBClient: () => DocumentClient;
