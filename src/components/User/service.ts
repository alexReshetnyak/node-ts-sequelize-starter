import { HttpError } from './../../config/error/index';
import * as Joi from 'joi';

import { User } from './model';
import UserValidation from './validation';
import { IUserService } from './interface';

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
  /**
   * @returns {Promise<User[]>}
   * @memberof UserService
   */
  async findAll(): Promise<User[]> {
    try {
      return await User.findAllWithoutPass();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {number} id
   * @returns {Promise<User>}
   * @memberof UserService
   */
  async findOne(id: number): Promise<User> {
    try {
      const validate: Joi.ValidationResult<{ id: number }> = UserValidation.getUser({ id });

      if (validate.error) throw new Error(validate.error.message);
      
      return await User.findByPkWithoutPass(id);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {IUserModel} user
   * @returns {Promise<IUserModel>}
   * @memberof UserService
   */
  async insert(body: User): Promise<User> {
    try {
      const validate: Joi.ValidationResult<User> = UserValidation.createUser(body);

      if (validate.error) throw new Error(validate.error.message);

      const user: User = await User.create(body);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {number} id
   * @returns {Promise<IUserModel>}
   * @memberof UserService
   */
  async remove(id: number): Promise<User> {
    try {
      const user = await this.findOne(id);

      if (!user) throw new HttpError(404, `user with such id (${id}) doesn't exist`);
      user.destroy();

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default UserService;
