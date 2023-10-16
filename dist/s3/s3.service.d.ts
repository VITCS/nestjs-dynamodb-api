/// <reference types="node" />
import { S3 } from 'aws-sdk';
export declare class S3Service {
    private readonly s3;
    constructor(s3: S3);
    uploadFile(key: string, data: Buffer): Promise<S3.ManagedUpload.SendData>;
}
