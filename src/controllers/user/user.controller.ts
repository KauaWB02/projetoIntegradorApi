import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { IUser } from '../../interfaces/user/user.interface';
import { IReturn } from '../../interfaces/user/return.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<IReturn> {
    return this.userService.getUsers();
  }
  @Get(':idUser')
  getUserById(@Param('idUser') idUser: string): Promise<IReturn> {
    return this.userService.getUserById(idUser);
  }

  @Post('create')
  createUser(@Body() user: IUser): Promise<IReturn> {
    return this.userService.createUser(user);
  }

  @Put('update/:idUser')
  updateUser(
    @Body() body: IUser,
    @Param('idUser') idUser: string,
  ): Promise<IReturn> {
    return this.userService.updateUser(body, idUser);
  }
}
