import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  publicationYear: number;

  createAt: string
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsNumber()
  @IsOptional()
  publicationYear: number;

  @IsOptional()
  createAt: string
}

export class BookDto {

  bookId: string
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsNumber()
  @IsOptional()
  publicationYear: number;

  @IsOptional()
  createAt: string
}