import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import JwtService from '../services/validation/jwt.service';
// import Users from '../database/models/users';
// import ILogin from '../interfaces/ILogin';
import { IUserService } from '../services/databaseInteraction/users.service';
// import { IUserValidations } from '../services/userValidation.service';

export default class UsersController {
  constructor(private userService: IUserService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const { userInfo } = req.body;
    const token: string = JwtService.signToken(userInfo);
    res.status(StatusCodes.OK).json({ token });
  };

  validateUser = (req: Request, res: Response): void => {
    const { userInfo } = req.body;
    const { role } = userInfo;
    res.status(StatusCodes.OK).json({ role });
  };
}
