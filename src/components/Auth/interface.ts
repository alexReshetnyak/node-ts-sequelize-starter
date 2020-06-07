import { User } from '../User/model';

/**
 * @export
 * @interaface IAuthService
 */
export interface IAuthService {
  /**
   * @param {User} User
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  createUser(user: User): Promise<User>;
  /**
   * @param {User} User
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  getUser(user: User): Promise<User>;
}
