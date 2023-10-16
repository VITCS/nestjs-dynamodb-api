"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamoDBClient = void 0;
const AWS = require("aws-sdk");
require("dotenv/config");
const { ENDPOINT_URL, REGION } = process.env;
const dynamoDBClient = () => {
    return new AWS.DynamoDB.DocumentClient({
        region: REGION,
        endpoint: ENDPOINT_URL,
    });
};
exports.dynamoDBClient = dynamoDBClient;
//# sourceMappingURL=dynamoDBClient.js.map