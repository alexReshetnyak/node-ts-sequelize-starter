import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as _ from 'lodash';

import { sequelize } from '../../config/connection/connection';
import { 
  Model, 
  DataTypes, 
  FindOptions, 
  HasOneGetAssociationMixin,
  HasOneCreateAssociationMixin,
  HasOneSetAssociationMixin,
  Association,
} from 'sequelize';
import { Token } from '../Auth/model';

/**
 * @export
 * @class User
 * @extends {Model}
 */
export { User };

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          example: 1
 *        uuid:
 *          type: string
 *          example: asd4-asd4-ass1-lol4
 *        name:
 *          type: string
 *          example: Alex
 *        email:
 *          type: string
 *          example: alex@gmail.com
 *        password:
 *          type: string
 *          example: pass
 *        created_at:
 *          type: string
 *          format: date
 *          example: date
 *        updated_at:
 *          type: string
 *          format: date
 *          example: date
 *        tokens:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Token'
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/User'
 */
class User extends Model {
  public id: number;
  public uuid: string;
  public name: string;
  public email: string;
  public password: string;

  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly tokens?: Token[];

  public getToken: HasOneGetAssociationMixin<Token>;
  public setToken: HasOneSetAssociationMixin<Token, number>;
  public createToken: HasOneCreateAssociationMixin<Token>;

  public static associations: {
    tokens: Association<User, Token>;
  };

  /**
   * Method for comparing passwords
   */
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    try {
      const match: boolean = await bcrypt.compare(candidatePassword, this.password);
  
      return match;
    } catch (error) {
      return error;
    }
  };
  
  /**
   * Helper method for getting user's gravatar.
   */
  public gravatar(size: number): string {
    if (!size) size = 200;
    if (!this.email) return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  
    const md5: string = crypto.createHash('md5').update(this.email).digest('hex');
  
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
  };

  /**
   * Excludes password and token_id from query
   */
  static findAllWithoutPass(options?: FindOptions): Promise<any> {
    const params = _.merge({ attributes: { exclude: ['password', 'token_id'] } },  options || {});
    return this.findAll(params);
  }

  /**
   * Excludes password and token_id from query
   */
  static findByPkWithoutPass(id: number, options?: FindOptions): Promise<any> {
    const params = _.merge({ attributes: { exclude: ['password', 'token_id'] } },  options || {});
    return this.findByPk(id, params);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    set: function (val) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(val, salt);

      this.setDataValue('password', hash);
    },
  },
  token_id: {
    type: DataTypes.UUID,
  },
}, {
  tableName: 'users',
  sequelize,
});

User.hasOne(Token, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'token',
});
