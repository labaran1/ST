import { Controller, Param, Get } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':username')
  findByAuthor(@Param('username') username: string) {
    return this.blogService.findByAuthor(username);
  }
  @Get(':username/:id')
  findOne(@Param('id') id: string, @Param('username') username: string) {
    return this.blogService.findOne(id, username);
  }
}
