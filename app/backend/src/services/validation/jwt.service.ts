import { sign, verify, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
// import { IJwt } from '../interfaces/IJwt';
import { StatusCodes } from 'http-status-codes';
// import { IId } from '../interfaces/IId';
import NewError from '../../helpers/NewError';
// import { IUserWithoutPassword } from '../interfaces/IUserWithoutPassword';
import { UserWithoutPassword } from '../../types/userWithoutPassword';

export default class JwtService {
  public static signToken(payload:UserWithoutPassword):string {
    const token = sign(payload, process.env.JWT_SECRET || 'easypassword', {
      expiresIn: '6h',
      algorithm: 'HS256',
    });
    return token;
  }

  public static validateToken(token:string): JwtPayload {
    try {
      const decoded = verify(token, process.env.JWT_SECRET || 'easypassword');
      return decoded as JwtPayload;
    } catch (erro) {
      throw new NewError('Token must be a valid token', StatusCodes.UNAUTHORIZED);
    }
  }
}
