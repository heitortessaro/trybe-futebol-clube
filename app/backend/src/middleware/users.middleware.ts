import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import HashPassword from '../services/hashPassword.service';
import NewError from '../helpers/NewError';
import { IUserService } from '../services/users.service';

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
    // .messages({ 'any.required': 'All fields must be filled' });
    // .messages({ ''string.required': 'All fields must be filled'' });
    // console.log(loginInfo);
    // const { error } = await schema.validateAsync(loginInfo);
    try {
      await schema.validateAsync(loginInfo);
    } catch (_error) {
      throw new NewError('All fields must be filled', StatusCodes.BAD_REQUEST);
    }
    // if (error) throw error;
    // if (error) throw new NewError('All fields must be filled', StatusCodes.BAD_REQUEST);
    next();
  };

  userLoginInfoIsValid = async (
    req: Request,
    _res:Response,
    next:NextFunction,
  ) => {
    const { loginInfo } = req.body;
    const user = await this.userService.findOneByEmail(loginInfo.email);
    if (!user) throw new NewError('Incorrect email or password', StatusCodes.UNAUTHORIZED);
    if (!HashPassword.validatePassword(loginInfo.password, user.password)) {
      throw new NewError('Incorrect email or password', StatusCodes.UNAUTHORIZED);
    }
    const { id, username, role, email } = user;
    req.body.userInfo = { id, username, role, email };
    next();
  };
}
