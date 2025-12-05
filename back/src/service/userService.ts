import crypto from 'node:crypto';
import { config } from '../config';
import { IUser } from '../types/user';
import { AlreadRegisteredError, DBError, ErrorMessages, ValidationError } from '../errors';
import { dbQuery } from '../db';
import { User } from '../model/User';
import { BasketService } from './BasketService';

export class UserService {
  static generateSalt() {
    const { passwordSaltBytesLength, hashPresentation } = config;
    return crypto.randomBytes(passwordSaltBytesLength).toString(hashPresentation);
  }

  static hashPassword(password: string, salt: string) {
    const { hashPasswordIterationsCount, hashPasswordLength, hashAlgorithm, hashPresentation } = config;
    return crypto.pbkdf2Sync(password, salt, hashPasswordIterationsCount, hashPasswordLength, hashAlgorithm).toString(hashPresentation);
  }

  static async saveUser(newUser: IUser):Promise<number> {
    const { email, password, public_key, role } = newUser;
    try {

      await dbQuery('BEGIN');

      const dbResponse = await dbQuery(
        'insert into users(email, password, public_key, role) values($1, $2, $3, $4) returning id', [email, password, public_key, role!]
      );
      const userId = dbResponse.rows[0].id;

      await BasketService.createBasketForUserId(userId);
      await dbQuery('COMMIT');

      return dbResponse.rows[0].id;

    } catch(error) {
      console.log("Error from UserService:createUser. Error: ", error);
      await dbQuery('ROLLBACK');
      throw new DBError(ErrorMessages.CreateUserError)

    }
  }

  static async checkIsUserCreated(email: string): Promise<void> {
    const { count } = await dbQuery<IUser>("select * from users where email=$1", [email]);

    if (count > 0)  {
      throw new AlreadRegisteredError();
    }
  }

  static async findUserByEmail(email:string): Promise<IUser | null> {
    try {
      const dbResponse = await dbQuery<IUser>('select * from users where email=$1', [email]);

      if (dbResponse.count) {
        return new User(dbResponse.rows[0]);
      }
      return null;

    } catch(error) {
      console.error(error);
      throw new DBError();
    }
  }

  static checkPasswordsEqual(userDbPassword: string, candidatePassword: string, salt: string): boolean {
    return this.hashPassword(candidatePassword, salt) === userDbPassword;
  }
}