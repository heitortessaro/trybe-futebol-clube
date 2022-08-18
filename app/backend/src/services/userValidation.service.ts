import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import NewError from '../helpers/NewError';
import ILogin from '../interfaces/ILogin';
import HashPassword from './hashPassword.service';
import { IUserService } from './users.service';

export interface IUserValidations {
  dataExists(loginInfo:ILogin): Promise<Joi.ValidationResult>,
  dataIsValid(loginInfo:ILogin): Promise<boolean>,
}

export default class UserValidationService implements IUserValidations {
  constructor(private userService: IUserService) {}

  dataExists = async (loginInfo:ILogin): Promise<Joi.ValidationResult> => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(1).required(),
    });
    const { error, value } = await schema.validateAsync(loginInfo);
    if (error) throw error;
    return value;
  };

  dataIsValid = async (loginInfo:ILogin): Promise<boolean> => {
    const user = await this.userService.findOneByEmail(loginInfo.email);
    if (!user) throw new NewError('Incorrect email or password', StatusCodes.UNAUTHORIZED);
    if (HashPassword.validatePassword(loginInfo.password, user.password)) {
      throw new NewError('Incorrect email or password', StatusCodes.UNAUTHORIZED);
    }
    return true;
  };
}
