import { Injectable, Inject } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
    constructor(@Inject('S3') private readonly s3: S3) { }

    async uploadFile(key: string, data: Buffer) {
        const params = {
            Bucket: 'your-s3-bucket-name',
            Key: key,
            Body: data,
        };

        return this.s3.upload(params).promise();
    }
}
