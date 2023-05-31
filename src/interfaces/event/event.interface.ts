import { IUser } from '../user/user.interface';

export interface IEvent {
  id: string;
  title: string;
  description: string;
  dthStart: Date;
  descriptionSwitching: string;
  amountTeams: number;
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
  ended: string;
  endedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
