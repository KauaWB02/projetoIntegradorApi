import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { IUser } from '../../interfaces/user/user.interface';
import { IReturn } from '../../interfaces/user/return.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<IReturn> {
    return this.userService.getUsers();
  }

  @Post('create')
  createUser(@Body() user: IUser): Promise<IReturn> {
    return this.userService.createUser(user)
  }
}
