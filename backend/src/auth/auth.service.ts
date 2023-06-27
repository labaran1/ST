import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const myDoc = await this.UserModel.find({ email: email });
    if (myDoc[0]) {
      const isMatch = await bcrypt.compare(password, myDoc[0].password);
      if (isMatch) {
        const payload = {
          sub: myDoc[0]?._id,
          email: email,
        };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new HttpException(
          'invalid email or password',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        'invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const myDoc = await this.UserModel.findOne({
      email: createUserDto.email,
    });
    if (myDoc) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    } else {
      if (createUserDto.password !== createUserDto.password2) {
        throw new HttpException(
          'password and confirm password are not the same',
          HttpStatus.BAD_REQUEST,
        );
      }
      //todo: more validation
      try {
        const newU = { ...createUserDto };
        newU.password = await bcrypt.hash(newU.password, 10);
        newU.username = newU.email.split('@')[0];
        const createdUser = new this.UserModel(newU);
        await createdUser.save();
        return HttpStatus.CREATED;
      } catch (error) {
        throw new HttpException(
          'something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async myDetails(username: string, req: any): Promise<any> {
    try {
      const doc = (
        await this.UserModel.findOne({ username: username })
      ).toObject();
      if (req.user.email !== doc.email) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      } else {
        delete doc.password;
        return doc;
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
