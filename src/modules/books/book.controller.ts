import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { BookService } from './book.service';
import { BookDto } from './dtos/createBook.dto';
import { PaginateDto } from './dtos/paginate.dto';
import { UpdateBookDto } from './dtos/updateBook.dto';

@Controller('book')
export class BookController {
  UpdateBook;
  constructor(private readonly bookService: BookService) {}

  @Get('usersFire')
  async loglog() {
    return await this.bookService.getUsers();
  }

  @Get()
  findAll(@Query() paginateDto: PaginateDto) {
    return this.bookService.findAll(paginateDto);
  }

  @Get('one')
  findBook(@Body('_id') _id: string) {
    return this.bookService.findById(_id);
  }

  @Get('authors')
  findAllAuthors(@Query() paginateDto: PaginateDto) {
    return this.bookService.findAllAuthors(paginateDto);
  }

  @Post()
  async create(@Body() bookDto: BookDto) {
    return await this.bookService.create(bookDto);
  }

  @Post('upateOne')
  async updateBook(@Body() updateBookDto: UpdateBookDto) {
    return await this.bookService.updateBook(updateBookDto);
  }

  @Get('authorsUpdate')
  async updateAuthors() {
    return await this.bookService.updateAuthor();
  }

  //aggregation

  @Get('countAll')
  async countAll(@Query() paginateDto: PaginateDto) {
    return await this.bookService.countBooks(paginateDto);
  }

  @Get('booksTime')
  async booksTime(@Query() paginateDto: PaginateDto) {
    return await this.bookService.booksTime(paginateDto);
  }

  @Get('authorBooks')
  async authorBooks(@Query() paginateDto: PaginateDto) {
    return await this.bookService.authorBooks(paginateDto);
  }

  @Get('booksOwners')
  async booksOwners(@Query() paginateDto: PaginateDto) {
    return await this.bookService.booksOwners(paginateDto);
  }

  @Get('profit')
  async authorProfit() {
    return await this.bookService.totalProfit();
  }

  @Get('recentPublished')
  async recentPublished(@Query() paginateDto: PaginateDto) {
    return await this.bookService.recentPublished(paginateDto);
  }

  @Get('ratecheck')
  async rateCheck(@Query() paginateDto: PaginateDto) {
    return await this.bookService.rateCheck(paginateDto);
  }
}
