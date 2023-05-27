import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './service/user/user.service';
import { UserModel } from '../../database/userModel';
import { LoginService } from './service/login/login.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserModel, LoginService],
})
export class userModule {}
