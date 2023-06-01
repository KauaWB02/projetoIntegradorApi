import { IEvent } from './event/event.interface';
import { IProfile } from './profile/profile';
import { ILoginReturn } from './user/login/loginReturn.interface';
import { IUser } from './user/user.interface';

export interface IReturn {
  message: string;
  data:
    | Array<IUser>
    | IUser
    | ILoginReturn
    | IEvent
    | Array<IEvent>
    | Array<IProfile>
    | IProfile;
}
