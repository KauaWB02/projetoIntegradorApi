import { IUser } from './user.interface';

export interface IReturn {
  message: Array<IUser> | IUser | string;
  error: string;
  status: number;
}
