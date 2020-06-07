import { User } from './model';

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {

  /**
   * @returns {Promise<User[]>}
   * @memberof IUserService
   */
  findAll(): Promise<User[]>;

  /**
   * @param {number} id
   * @returns {Promise<User>}
   * @memberof IUserService
   */
  findOne(id: number): Promise<User>;

  /**
   * @param {User} User
   * @returns {Promise<User>}
   * @memberof IUserService
   */
  insert(User: User): Promise<User>;

  /**
   * @param {number} id
   * @returns {Promise<User>}
   * @memberof IUserService
   */
  remove(id: number): Promise<User>;
}
