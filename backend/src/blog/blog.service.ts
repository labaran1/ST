import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/schemas/blog/blog.schema';
import { User } from 'src/schemas/User/user.schema';
import { validateCreateBlog } from './validations/createBlog';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private BlogModel: Model<Blog>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async create(createBlogDto: CreateBlogDto, req): Promise<any> {
    const error = await validateCreateBlog(createBlogDto);
    if (error) {
      throw error;
    }

    try {
      const UserDoc = await this.UserModel.findOne({
        email: req.user.email,
      });

      const blogDoc = await this.BlogModel.findOne({
        title: createBlogDto.title,
      });
      if (UserDoc._id.toString() === req.user.sub) {
        if (blogDoc) {
          if (blogDoc.author.toString() === UserDoc._id.toString()) {
            throw new HttpException(
              'You have already created a blog with this title',
              HttpStatus.BAD_REQUEST,
            );
          } else {
            const newBlog = new this.BlogModel({
              ...createBlogDto,
            });
            await newBlog.save();
            UserDoc.blogs.push(newBlog);
            await this.UserModel.findByIdAndUpdate(UserDoc._id, UserDoc, {
              new: true,
            });
          }
        } else {
          const newBlog = new this.BlogModel({
            ...createBlogDto,
          });
          await newBlog.save();
          UserDoc.blogs.push(newBlog);
          await this.UserModel.findByIdAndUpdate(UserDoc._id, UserDoc, {
            new: true,
          });
        }
      } else {
        throw new HttpException(
          'You are not authorized to perform this operation',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new HttpException(
        'Something went Wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(req): Promise<any> {
    try {
      const result = await this.BlogModel.find({
        author: req.user.sub,
      });
      return result;
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new HttpException(
        'Something went Wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string, req): Promise<any> {
    try {
      const result = await this.BlogModel.findById(id);
      if (result.author.toString() === req.user.sub) {
        return result;
      } else {
        throw new HttpException(
          'You are not authorized to perform this operation',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new HttpException(
        'Something went Wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, req): Promise<any> {
    try {
      const Doc = await this.BlogModel.findById(id);
      if (Doc.author.toString() !== req.user.sub) {
        throw new HttpException(
          'You are not authorized to perform this operation',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const result = await this.BlogModel.findByIdAndUpdate(id, updateBlogDto, {
        new: true,
      });

      if (result) {
        return result;
      } else {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new HttpException(
        'Something went Wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string, req): Promise<any> {
    try {
      const result = await this.BlogModel.findById(id);
      if (result.author.toString() !== req.user.sub) {
        throw new HttpException(
          'You are not authorized to perform this operation',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const deletedBlog = await this.BlogModel.findByIdAndDelete(id);
      if (deletedBlog) {
        return deletedBlog;
      } else {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new HttpException(
        'Something went Wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
