"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginator_1 = require("./paginator");
const aws_sdk_1 = require("aws-sdk");
const { TABLE_NAME } = process.env;
const ddb = new aws_sdk_1.DynamoDB.DocumentClient({ region: 'us-east-1' });
async function paginationOffset() {
    const offset = 10;
    const pageSize = 20;
    const ddbQueryParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'pk = :pk and sk > :sk',
        ExpressionAttributeValues: {
            ':pk': 'bookId',
            ':sk': offset,
        },
    };
    const records = await (0, paginator_1.getPaginatedResults)(async (ExclusiveStartKey, count) => {
        const queryResponse = await ddb
            .query(Object.assign({ ExclusiveStartKey }, ddbQueryParams))
            .promise();
        if (count + queryResponse.Count >= pageSize) {
            return {
                results: queryResponse.Items.slice(0, pageSize - count),
                marker: null,
            };
        }
        return {
            marker: queryResponse.LastEvaluatedKey,
            results: queryResponse.Items,
            count: count + queryResponse.Count,
        };
    });
    console.log('last item', records.sort((a, b) => a - b)[records.length - 1]);
}
paginationOffset().then(() => console.log('Done'));
//# sourceMappingURL=list-offset-pagination.js.map