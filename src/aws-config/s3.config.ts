import { S3 } from 'aws-sdk';

export const s3Config = {
    awsS3BucketName: 'your-s3-bucket-name',
    awsS3AccessKey: 'your-aws-access-key',
    awsS3SecretKey: 'your-aws-secret-key',
};

export const s3Provider = {
    provide: 'S3',
    useValue: new S3({
        accessKeyId: s3Config.awsS3AccessKey,
        secretAccessKey: s3Config.awsS3SecretKey,
    }),
};
