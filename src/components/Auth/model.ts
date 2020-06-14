import { sequelize } from '../../config/connection/connection';
import { Model, DataTypes } from 'sequelize';

/**
 * @export
 * @class Token
 * @extends {Model}
 */
export { Token };

/**
 * @swagger
 * components:
 *  schemas:
 *    Token:
 *      required:
 *        - user_id
 *        - token_id
 *      properties:
 *        id:
 *          type: string
 *          example: 1
 *        user_id:
 *          type: string
 *          example: 1
 *        token_id:
 *          type: string
 *          example: asd4-asd4-ass1-lol4
 *        created_at:
 *          type: string
 *          format: date
 *          example: date
 *        updated_at:
 *          type: string
 *          format: date
 *          example: date
 *    Tokens:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/Token'
 */
class Token extends Model {
  public id: number;
  public token_id: string;
  
  public readonly user_id: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
}

Token.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'tokens',
});
