import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOkResponse({ type: Category, isArray: true })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
