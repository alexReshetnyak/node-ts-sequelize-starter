import * as Joi from 'joi';
import Validation from '../validation';
import { User } from './model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {

  /**
   * Creates an instance of UserValidation.
   * @memberof UserValidation
   */
  constructor() { super(); }

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
   * @param {{ id: number }} body
   * @returns {Joi.ValidationResult<{ id: number }>}
   * @memberof UserValidation
   */
  getUser(body: { id: number }): Joi.ValidationResult<{id: number}> {
    const schema: Joi.Schema = Joi.object().keys({
      id: Joi.number().required(),
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {{ id: number }} body
   * @returns {Joi.ValidationResult<{ id: number }>}
   * @memberof UserValidation
   */
  removeUser(body: { id: number }): Joi.ValidationResult<{id: number}> {
    const schema: Joi.Schema = Joi.object().keys({
      id: Joi.number().required(),
    });

    return Joi.validate(body, schema);
  }
}

export default new UserValidation();
