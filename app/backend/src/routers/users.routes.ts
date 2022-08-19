import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import UsersMiddleware from '../middleware/users.middleware';
import { UsersService } from '../services/users.service';
// import UserController from '../controllers/user.controller';

const router = Router();

const usersService = new UsersService();
const usersMiddleware = new UsersMiddleware(usersService);
const userController = new UsersController(usersService);

router.post(
  '/login',
  usersMiddleware.extractUserLoginInfo,
  usersMiddleware.userDataLoginExists,
  usersMiddleware.userLoginInfoIsValid,
  userController.login,
);

export default router;
