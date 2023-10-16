"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Provider = exports.s3Config = void 0;
const aws_sdk_1 = require("aws-sdk");
exports.s3Config = {
    awsS3BucketName: 'your-s3-bucket-name',
    awsS3AccessKey: 'your-aws-access-key',
    awsS3SecretKey: 'your-aws-secret-key',
};
exports.s3Provider = {
    provide: 'S3',
    useValue: new aws_sdk_1.S3({
        accessKeyId: exports.s3Config.awsS3AccessKey,
        secretAccessKey: exports.s3Config.awsS3SecretKey,
    }),
};
//# sourceMappingURL=s3.config.js.map