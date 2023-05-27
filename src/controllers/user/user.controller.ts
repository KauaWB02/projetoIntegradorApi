import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { IUser } from '../../interfaces/user/user.interface';
import { IReturn } from '../../interfaces/user/return.interface';
import { LoginService } from './service/login/login.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly loginService: LoginService,
  ) {}

  @Post('login')
  loginUser(@Body() body: IUser): Promise<IReturn> {
    return this.loginService.loginUser(body);
  }

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

  @Delete('delete/:idUser')
  deleteUser(@Param('idUser') idUser: string): Promise<IReturn> {
    return this.userService.deleteUser(idUser);
  }
}
