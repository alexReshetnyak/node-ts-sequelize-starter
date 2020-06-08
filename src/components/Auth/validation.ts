import * as Joi from 'joi';
import Validation from '../validation';
import { User } from '../User/model';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {

  /**
   * Creates an instance of AuthValidation.
   * @memberof AuthValidation
   */
  constructor() {
    super();
  }
  
  /**
   * @param {User} params
   * @returns {Joi.ValidationResult<User>}
   * @memberof UserValidation
   */
  createUser(params: User): Joi.ValidationResult<User> {
    const schema: Joi.Schema = Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email({
        minDomainAtoms: 2
      }).required()
    });

    return Joi.validate(params, schema);
  }

  /**
   * @param {User} params
   * @returns {Joi.ValidationResult<User>}
   * @memberof UserValidation
   */
  getUser(params: User): Joi.ValidationResult<User> {
    const schema: Joi.Schema = Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string().email({
        minDomainAtoms: 2
      }).required()
    });

    return Joi.validate(params, schema);
  }

  /**
   * @param {{refreshToken: string}} params
   * @returns {Joi.ValidationResult<{refreshToken: string}>}
   * @memberof UserValidation
   */
  getDbRefreshToken(
    params: { refreshToken: string }
  ): Joi.ValidationResult<{refreshToken: string}> {
    const schema: Joi.Schema = Joi.object().keys({
      refreshToken: Joi.string().required(),
    });

    return Joi.validate(params, schema);
  }
}

export default new AuthValidation();
