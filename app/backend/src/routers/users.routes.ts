import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import UsersMiddleware from '../middleware/users.middleware';
import { UsersService } from '../services/databaseInteraction/users.service';
// import UserController from '../controllers/user.controller';

const router = Router();

const usersService = new UsersService();
const usersMiddleware = new UsersMiddleware(usersService);
const userController = new UsersController(usersService);

router.get(
  '/login/validate',
  usersMiddleware.validateAuthorizationToken,
  userController.validateUser,
);

router.post(
  '/login',
  usersMiddleware.extractUserLoginInfo,
  usersMiddleware.userDataLoginExists,
  usersMiddleware.userLoginInfoIsValid,
  userController.login,
);

export default router;
