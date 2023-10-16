import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('book')
// @UseInterceptors(CacheInterceptor)
export class BookController {
  constructor(private readonly bookService: BookService,) { }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @Post('/insert-bulk')
  async createBulk(@Body() createBookDto: CreateBookDto[]) {
    return await this.bookService.createBulk(createBookDto);
  }

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @Post('/bookId')
  async findOne(@Body() requestBody: any) {
    const bookId = requestBody.bookId;
    return await this.bookService.findOne(bookId);
  }

  @Put(':bookId')
  async update(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.bookService.update(bookId, updateBookDto);
  }

  @Delete(':bookId')
  async remove(@Param('bookId') bookId: string) {
    return await this.bookService.remove(bookId);
  }

  @Post('/bulk-delete')
  async removeBulk(@Body() createBookDto: CreateBookDto[]) {
    await this.bookService.removeBulk(createBookDto);
    return { message: 'Records deleted successfully' };
  }

  @Post('/paginate')
  async paginateRecords(@Body() paginationParams: any) {
    try {
      const { tableName, pageSize, startKey } = paginationParams;
      const parsedPageSize = parseInt(pageSize.toString(), 10);
      const result = await this.bookService.paginateRecords(tableName, parsedPageSize, startKey);
      console.log('result pagination:  ', result)
      return result;
    } catch (error) {
      return { error: 'Error paginating records' };
    }
  }

}
