import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import AuthService from './service';
import HttpError from '../../config/error';
import { User } from '../User/model';

/**
 * @export
 * @param {Request} req
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise<void>}
 */
export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: User = await AuthService.createUser(req.body);
    const { token, refreshToken } = await AuthService.updateTokens(user);
    
    res.json({
      status: 200,
      logged: true,
      token,
      refreshToken,
      message: 'Sign in successfull'
    });
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: User = await AuthService.getUser(req.body);
    const { token, refreshToken } = await AuthService.updateTokens(user);
    
    res.json({
      status: 200,
      logged: true,
      token,
      refreshToken,
      message: 'Sign in successfull'
    });

  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function refreshToken(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const oldToken = await AuthService.getDbRefreshToken(req.body);
    const user = await User.findByPkWithoutPass(+oldToken.user_id);
    const { token, refreshToken } = await AuthService.updateTokens(user);

    res.json({
      status: 200,
      logged: true,
      token,
      refreshToken,
      message: 'Token was updated'
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new HttpError(400, 'Token expired!'));
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new HttpError(400, 'Invalid token!'));
    }

    next(new HttpError(error.message.status, error.message));
  }
}

