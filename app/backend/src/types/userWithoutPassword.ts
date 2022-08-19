import { IUser } from '../interfaces/IUsers';

export type UserWithoutPassword = Omit<IUser, 'password'>;
