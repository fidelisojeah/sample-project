import { Chore } from '@models';
import { validateChoreDetails } from '@validations';
import Response from '@helpers/Response';
import { BaseController } from './index';


export default class ChoreController extends BaseController {
    /**
     * Create a new chore
     * @async
     * @param  {object} request - Request object
     * @param {object} response - Response object
     * @param {object} next The next middleware
    */
    async create(request, response, next) {
        try {
            const choreDetails = await validateChoreDetails(request.body);

            const chore = await Chore.create({ ...choreDetails });

            return Response.success(response, 200, chore, 'chore created successfully');
        } catch (error) {
            next(error);
        }
    }
    /**
     * Create a new chore
     * @async
     * @param  {object} request - Request object
     * @param {object} response - Response object
     * @param {object} next The next middleware

    */
    async getOne(request, response, next) {
        try {
            const { id } = request.params;
            
            const chore = await this.findObjector404(Chore, id);

            return Response.success(response, 200, chore);
        } catch (error) {
            next(error);
        }
    }
    /**
     * Create a new chore
     * @async
     * @param  {object} request - Request object
     * @param {object} response - Response object
     * @param {object} next The next middleware

    */
    async update(request, response, next) {
        try {
            const { id } = request.params;
            const chore = await this.findObjector404(Chore, id);

            const choreDetails = await validateChoreDetails(request.body);


            await chore.update({ ...choreDetails });

            return Response.success(response, 200, chore, 'chore updated successfully.');
        } catch (error) {
            next(error);
        }
    }
    /**
     * Create a new chore
     * @async
     * @param  {object} request - Request object
     * @param {object} response - Response object
     * @param {object} next The next middleware
    */
    async delete(request, response, next) {
        try {
            const { id } = request.params;
            const chore = await this.findObjector404(Chore, id);


            await chore.destroy();

            return Response.success(response, 200, {}, 'Chore deleted successfully.');
        } catch (error) {
            next(error);
        }
    }

    /**
   * Get chores and their corresponding profiles
   * @async
   * @param {object} request - Request object
   * @param {object} response - Response object
   * @param {object} next The next middleware
   * @return {json} Returns json object

   */
    async getAll(request, response, next) {
        try {
            const chores = await Chore.findAll({
                attributes: ['id', 'name', 'description']
            });

            return Response.success(response, 200, chores);
        } catch (error) {
            next(error);
        }
    }
}