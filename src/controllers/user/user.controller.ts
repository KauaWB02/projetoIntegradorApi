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
import { IReturn } from '../../interfaces/return.interface';
import { LoginService } from './service/login/login.service';
import { Events } from '../../entity/Event';
import { AppDataSource } from '../../database/connection';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly loginService: LoginService,
  ) {}

  @Get('tete/teqwe')
  teste() {
    const conn = AppDataSource.getRepository(Events);

    const evento = conn.find({ relations: { user: true } });

    return evento;
  }

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
