import { sign, verify, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
// import { IJwt } from '../interfaces/IJwt';
import { StatusCodes } from 'http-status-codes';
// import { IId } from '../interfaces/IId';
import NewError from '../helpers/NewError';
// import { IUserWithoutPassword } from '../interfaces/IUserWithoutPassword';
import { UserWithoutPassword } from '../types/userWithoutPassword';

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
      // const { email, id } = decoded;
      return decoded as JwtPayload;
    } catch (erro) {
      // createError(401, 'Expired or invalid token');
      throw new NewError('Expired or invalid token', StatusCodes.UNAUTHORIZED);
    }
  }
}
