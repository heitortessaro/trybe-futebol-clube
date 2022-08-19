import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import IRequestAuthorization from '../interfaces/IRequestAuthorization';
import HashPassword from '../services/hashPassword.service';
import NewError from '../helpers/NewError';
import { IUserService } from '../services/users.service';
import JwtService from '../services/jwt.service';

export default class UsersMiddleware {
  constructor(private userService: IUserService) {}

  extractUserLoginInfo = async (
    req: Request,
    _res:Response,
    next:NextFunction,
  ) => {
    const { email, password } = req.body;
    req.body.loginInfo = { email, password };
    next();
  };

  userDataLoginExists = async (
    req: Request,
    _res:Response,
    next:NextFunction,
  ) => {
    const { loginInfo } = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(1).required(),
    });
    try {
      await schema.validateAsync(loginInfo);
    } catch (_error) {
      throw new NewError('All fields must be filled', StatusCodes.BAD_REQUEST);
    }
    next();
  };

  userLoginInfoIsValid = async (
    req: Request,
    _res:Response,
    next:NextFunction,
  ) => {
    const invalidDataMessage = 'Incorrect email or password';
    const { loginInfo } = req.body;
    const user = await this.userService.findOneByEmail(loginInfo.email);
    if (!user) throw new NewError(invalidDataMessage, StatusCodes.UNAUTHORIZED);
    if (!HashPassword.validatePassword(loginInfo.password, user.password)) {
      throw new NewError(invalidDataMessage, StatusCodes.UNAUTHORIZED);
    }
    const { id, username, role, email } = user;
    req.body.userInfo = { id, username, role, email };
    next();
  };

  validateAuthorizationToken = async (
    req: IRequestAuthorization,
    _res:Response,
    next:NextFunction,
  ) => {
    const token = req.headers.authorization;
    const decoded = JwtService.validateToken(token as string);
    const { id, username, role, email } = decoded;
    req.body.userInfo = { id, username, role, email };
    next();
  };
}
