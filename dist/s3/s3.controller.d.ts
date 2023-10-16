import { S3Service } from './s3.service';
export declare class S3Controller {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    uploadFile(file: any): Promise<{
        message: string;
        s3Response: import("aws-sdk/clients/s3").ManagedUpload.SendData;
    }>;
}
