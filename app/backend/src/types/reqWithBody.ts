import { Request } from 'express';
import { UserWithoutPassword } from './userWithoutPassword';

export type RequestWithBody = Request & {
  user: UserWithoutPassword
};
