import { ILoginReturn } from './login/loginReturn.interface';
import { IUser } from './user.interface';

export interface IReturn {
  message: string;
  data: Array<IUser> | IUser | ILoginReturn;
  error: string;
  status: number;
}
