import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('upload')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) { }

    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        const { originalname, buffer } = file;

        // Upload file to S3
        const s3Response = await this.s3Service.uploadFile(originalname, buffer);


        // await this.elasticSearchService.indexRecord(s3Response.Location, originalname);

        return {
            message: 'File uploaded successfully',
            s3Response,
        };
    }
}
