import { IId } from './IId';

export interface IUser extends IId {
  username: string,
  role: string,
  password: string,
}
