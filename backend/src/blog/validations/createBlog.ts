import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateBlogDto } from '../dto/create-blog.dto';

export const validateCreateBlog = async (createBlogDto: CreateBlogDto) => {
  // required
  if (!createBlogDto.author) {
    return new HttpException(
      'You must provide the author of the blog',
      HttpStatus.BAD_REQUEST,
    );
  }
  if (!createBlogDto.title) {
    return new HttpException(
      'You must provide the title of the blog',
      HttpStatus.BAD_REQUEST,
    );
  }
  if (!createBlogDto.body) {
    return new HttpException(
      'You must  provide blog content',
      HttpStatus.BAD_REQUEST,
    );
  }
  if (!createBlogDto.tags) {
    return new HttpException(
      'You must provide at least one tag',
      HttpStatus.BAD_REQUEST,
    );
  }
  if (!createBlogDto.date) {
    return new HttpException(
      'You must provide the date of the blog',
      HttpStatus.BAD_REQUEST,
    );
  }

  //
  if (createBlogDto.title.length < 5)
    return new HttpException(
      'Title must be at least 5 characters long',
      HttpStatus.BAD_REQUEST,
    );
  if (createBlogDto.body.length < 10)
    return new HttpException(
      'Content must be at least 10 characters long',
      HttpStatus.BAD_REQUEST,
    );
};
