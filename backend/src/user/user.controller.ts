import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // to public
  // @Get(':userName')
  // userDetails(@Param('userName') userName: string) {
  //   return this.userService.getUserDetails(userName);
  // }
}
