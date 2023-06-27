import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/schemas/blog/blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private BlogModel: Model<Blog>) {}
}
