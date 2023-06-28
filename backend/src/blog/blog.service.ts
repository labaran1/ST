import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/schemas/blog/blog.schema';
import { User } from 'src/schemas/User/user.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private BlogModel: Model<Blog>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async findAll(): Promise<any> {
    try {
      const blogs = await this.BlogModel.find();
      return blogs;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string, username: string): Promise<any> {
    try {
      const user = await this.UserModel.findOne({ username });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const blog = await this.BlogModel.findById(id);
      if (!blog) {
        throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
      }
      return blog;
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      } else {
        throw new HttpException(
          'Something went Wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findByAuthor(username: string): Promise<any> {
    try {
      const user = await this.UserModel.find({ username });
      if (!user[0]) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const blogs = await this.BlogModel.find({ author: user[0]._id });
      return blogs;
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      } else {
        throw new HttpException(
          'Something went Wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
