import * as Joi from 'joi';

import AuthValidation from './validation';
import { IAuthService } from './interface';
import { User } from '../User/model';
import HttpError from '../../config/error';

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {

  /**
   * @param {User} body
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  async createUser(body: User): Promise<User> {
    try {
      const validate: Joi.ValidationResult<User> = AuthValidation.createUser(body);

      if (validate.error) throw new Error(validate.error.message);

      const userWithSuchEmail: User = await User.findOne({
        where: { email: body.email }
      });

      if (userWithSuchEmail) throw new HttpError(400, "This email already exists");

      const createdUser: User = await User.create(body);

      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * @param {User} body 
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  async getUser(body: User): Promise<User> {
    try {
      const validate: Joi.ValidationResult<User> = AuthValidation.getUser(body);

      if (validate.error) throw new Error(validate.error.message);

      const user: User = await User.findOne({
        where: { email: body.email }
      });
    
      const isMatched: boolean = user && await user.comparePassword(body.password);

      if (isMatched) return user;

      throw new Error('Invalid password or email');
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default AuthService;
