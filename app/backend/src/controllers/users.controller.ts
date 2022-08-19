import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import JwtService from '../services/jwt.service';
// import Users from '../database/models/users';
// import ILogin from '../interfaces/ILogin';
import { IUserService } from '../services/users.service';
// import { IUserValidations } from '../services/userValidation.service';

export default class UsersController {
  constructor(private userService: IUserService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    // const loginInfo:ILogin = req.body;
    // this.userValidation.dataExists(loginInfo);
    // const user = this.userValidation.dataIsValid(loginInfo);
    const { userInfo } = req.body;
    // const { password, ...payload } = user;
    const token: string = JwtService.signToken(userInfo);
    res.status(StatusCodes.OK).json(token);
  };
}
