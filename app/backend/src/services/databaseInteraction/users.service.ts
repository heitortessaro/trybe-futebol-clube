import Users from '../../database/models/users';

export interface IUserService {
  list(): Promise<Users[]>,
  findOneByEmail(email: string): Promise<Users | null>,
}

export class UsersService implements IUserService {
  list = async (): Promise<Users[]> => {
    const users: Users[] = await Users.findAll();
    return users;
  };

  findOneByEmail = async (email: string): Promise<Users | null> => {
    const user: Users | null = await Users.findOne({ where: { email } });
    return user;
  };
}
