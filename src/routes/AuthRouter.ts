import { Router } from 'express';
import { AuthComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/auth/signup
 * @swagger
 * /auth/signup/:
 *  post:
 *    description: sign up user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: sign up body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          example:
 *            email: test.user@mail.com
 *            password: test_test
 *            name: Alex
 *    responses:
 *      200:
 *        description: user successfully signed in
 *        content:
 *          application/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Sign in successfull!!
 *      400:
 *        description: sign in failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: Email already exists
 */
router.post('/signup', AuthComponent.signup);

/**
 * POST method route
 * @example http://localhost:PORT/auth/login
 * 
 * @swagger
 * /auth/login/:
 *  post:
 *    description: Login user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: login body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          example:
 *            email: test.user@mail.com
 *            password: test_test
 *    responses:
 *      200:
 *        description: user successfuly logged
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Successfully logged!
 *      401:
 *        description: Not logged, invalid credentials
 *        content:
 *          application/json:
 *            example:
 *              status: 401
 *              logged: false
 *              message: Invalid credentials
 */
router.post('/login', AuthComponent.login);


/**
 * POST method route
 * @example http://localhost:PORT/auth/refresh-token
 * 
 * @swagger
 * /auth/refresh-token/:
 *  post:
 *    description: Refresh tokens
 *    tags: ["auth"]
 *    requestBody:
 *      description: refresh token body
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            refreshToken: some-token
 *    responses:
 *      200:
 *        description: token successfully updated
 *        content:
 *          application/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Refresh token updated!
 *      400:
 *        description: Token not updated
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: Invalid token
 */
router.post('/refresh-token', AuthComponent.refreshToken);

/**
 * @export {express.Router}
 */
export default router;
