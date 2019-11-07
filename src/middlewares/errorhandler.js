import { ValidationError, UniqueConstraintError } from 'sequelize';
import Joi from '@hapi/joi';
import { GenericException } from '@helpers/exceptions';

export default function errorhandler(error, _request, response, _next) {

    if (error instanceof UniqueConstraintError) {
        const errors = error.errors.reduce((result, current) => {
            const currentPath = Array.isArray(current.path) ? current.path[0] : current.path;
            if (!result.hasOwnProperty(currentPath)) {
                result[currentPath] = [];
            }
            result[currentPath].push(current.message)
            return result;
        }, {});
        return response.status(400).send({
            errors,
            statusCode: 400,
            message: 'Error Validating Input'
        })
    }
    if (error instanceof Joi.ValidationError) {
        const errors = error.details.reduce((result, current) => {
            const currentPath = Array.isArray(current.path) ? current.path[0] : current.path;
            if (!result.hasOwnProperty(currentPath)) {
                result[currentPath] = [];
            }
            result[currentPath].push(current.message);
            return result;
        }, {});
        return response.status(400).send({
            errors,
            statusCode: 400,
            message: 'Error Validating Input'
        });
    }

    if (error instanceof GenericException) {
        return response.status(error.statusCode).send(error.formatError());
    }
    response.status(500).send(error)
}