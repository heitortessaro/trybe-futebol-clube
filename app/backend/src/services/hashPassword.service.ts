import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

// export interface IHashPassword {
//   encrypt(password:string):string,
//   validatePassword(password:string, hash:string): boolean,
// }

// export default class HashPassword implements IHashPassword {
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
