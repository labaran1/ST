import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, BlogModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
