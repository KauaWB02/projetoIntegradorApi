import { Controller, Get } from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { IUser } from '../../interfaces/user/user.interface';
import { IReturn } from '../../interfaces/user/return.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(): Promise<IReturn> {
    return this.userService.getUsers();
  }
}
