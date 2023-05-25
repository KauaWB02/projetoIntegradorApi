import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './service/user/user.service';
import { UserModel } from '../../database/userModel';

@Module({
  controllers: [UserController],
  providers: [UserService, UserModel],
})
export class userModule {}
