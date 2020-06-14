import { User } from '../User/model';
import { Token } from './model';

/**
 * @export
 * @interface IAuthService
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

  /**
   * @param {User} user
   * @returns {Promise<Tokens>}
   * @memberof AuthService
   */
  updateTokens(user: User): Promise<Tokens>;

  /**
   * @param {body} user
   * @returns {Promise<Token>}
   * @memberof AuthService
   */
  getDbRefreshToken(body: { refreshToken: string }): Promise<Token>;

  /**
   * @param {{email: string}} payload
   * @returns {string}
   * @memberof AuthService
   */
  generateAccessToken(payload: {email: string}): string;

  /**
   * @returns {{id: string, token: string}}
   * @memberof AuthService
   */
  generateRefreshToken(): {id: string, token: string};
}

/**
 * @export
 * @interface Tokens
 */
export interface Tokens {
  token: string; 
  refreshToken: string;
}


/**
 * @export
 * @interface RefreshToken
 */
export interface RefreshToken {
  id: string; 
  token: string;
}
