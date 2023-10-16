import { getPaginatedResults } from "./paginator";
import { DynamoDB } from 'aws-sdk';

const { TABLE_NAME } = process.env;
const ddb = new DynamoDB.DocumentClient({ region: 'us-east-1' });

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

    const records = await getPaginatedResults(async (ExclusiveStartKey, count: number) => {
        const queryResponse = await ddb
            .query({ ExclusiveStartKey, ...ddbQueryParams })
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