import { IUser } from './user.interface';

export interface IReturn {
  message: string;
  data: Array<IUser> | IUser;
  error: string;
  status: number;
}
