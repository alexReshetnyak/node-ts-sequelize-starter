import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import AuthValidation from './validation';
import HttpError from '../../config/error';
import app from '../../config/server/server';
import { IAuthService, Tokens, RefreshToken } from './interface';
import { User } from '../User/model';
import { Token } from './model';

const ACCESS_TOKEN_EXPIRES_IN: string = '30m';
const REFRESH_TOKEN_EXPIRES_IN: string = '1w';

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

      if (userWithSuchEmail) throw new HttpError(400, 'This email already exists');

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
  },

  /**
   * @param {body} user
   * @returns {Promise<Token>}
   * @memberof AuthService
   */
  async getDbRefreshToken(body: { refreshToken: string }): Promise<Token> {
    const validate: Joi.ValidationResult<
      { refreshToken: string }
    > = AuthValidation.getDbRefreshToken(body);

    if (validate.error) throw new Error(validate.error.message);

    const payload: {id: string, type: string} = <
      {id: string, type: string}
    >jwt.verify(body.refreshToken, app.get('secret'));
    
    if (payload.type !== 'refresh') throw new Error('Invalid token');

    return await Token.findOne({ where: { token_id: payload.id } });
  },

  /**
   * @param {User} user
   * @returns {Promise<Tokens>}
   * @memberof AuthService
   */
  async updateTokens(user: User): Promise<Tokens> {
    const token: string = this.generateAccessToken({ email: user.email });
    const { 
      id: tokenId, 
      token: refreshToken 
    }: RefreshToken = this.generateRefreshToken();

    await user.createToken({ token_id: tokenId });
    
    return { token, refreshToken };
  },

  /**
   * @param {{email: string}} payload
   * @param {string} expiresIn
   * @returns {string}
   * @memberof AuthService
   */
  generateAccessToken(payload: { email: string }): string {
    return jwt.sign(
      { ...payload, type: 'access' }, 
      app.get('secret'), 
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
  },

  /**
   * @param {string} expiresIn
   * @returns {{id: string, token: string}}
   * @memberof AuthService
   */
  generateRefreshToken(): RefreshToken {
    const id: string = uuid();
    const token: string = jwt.sign(
      { id, type: 'refresh' }, 
      app.get('secret'), 
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    return { id, token };
  },
};

export default AuthService;
