import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Request,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateBlogDto } from '../blog/dto/create-blog.dto';
import { UpdateBlogDto } from '../blog/dto/update-blog.dto';
@Controller('me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  myDetails(@Request() req) {
    return this.userService.myDetails(req);
  }

  // to be  protected
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post('/blogs')
  create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    return this.userService.create(createBlogDto, req);
  }
  @UseGuards(AuthGuard)
  @Get('/blogs')
  findAll(@Request() req) {
    return this.userService.findAll(req);
  }

  @UseGuards(AuthGuard)
  @Get('/blogs/:id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.userService.findOne(id, req);
  }

  @UseGuards(AuthGuard)
  @Patch('/blogs/:id')
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req,
  ) {
    return this.userService.update(id, updateBlogDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete('/blogs/:id')
  remove(@Param('id') id: string, @Request() req) {
    return this.userService.remove(id, req);
  }
}
