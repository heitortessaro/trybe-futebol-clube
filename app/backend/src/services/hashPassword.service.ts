import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export default class HashPassword {
  public static encrypt(password:string):string {
    const salt = genSaltSync(10);
    const hashPassword: string = hashSync(password, salt);
    return hashPassword;
  }

  public static validatePassword(password:string, hash:string): boolean {
    return compareSync(password, hash);
  }
}
