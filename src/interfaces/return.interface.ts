import { ILoginReturn } from './user/login/loginReturn.interface';
import { IUser } from './user/user.interface';

export interface IReturn {
  message: string;
  data: Array<IUser> | IUser | ILoginReturn;
}
