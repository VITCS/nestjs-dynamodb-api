import { S3 } from 'aws-sdk';
export declare const s3Config: {
    awsS3BucketName: string;
    awsS3AccessKey: string;
    awsS3SecretKey: string;
};
export declare const s3Provider: {
    provide: string;
    useValue: S3;
};
