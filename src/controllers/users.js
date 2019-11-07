import { User } from '@models';
import { validateUserDetails } from '@validations';
import Response from '@helpers/Response';

export default class UserController {
    /**
   * Create a new user
   * @async
   * @param  {object} request - Request object
   * @param {object} response - Response object
   * @param {object} next The next middleware
   * @return {json} Returns json object

   */
    async create(request, response, next) {
        try {
            const userDetails = await validateUserDetails(request.body);

            const user = await User.create({ ...userDetails });

            return Response.success(response, 201, user, 'User created successfully');
        } catch (error) {
            
            next(error);
        }
    }

    /**
   * Get users and their corresponding profiles
   * @async
   * @param {object} request - Request object
   * @param {object} response - Response object
   * @param {object} next The next middleware
   * @return {json} Returns json object

   */
    async getAll(request, response, next) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'email']
            });

            return Response.success(response, 200, users);
        } catch (error) {
            next(error);
        }
    }
}