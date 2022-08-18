import { IId } from './IId';

export interface IJwt {
  signToken(payload:IId): string,
  validateToken(token:string): IId,
}
