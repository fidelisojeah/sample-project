import { NOT_FOUND } from 'http-status-codes';

import GenericException from './GenericException';

export default class RouteNotFoundException extends GenericException {
    constructor(request) {
        const params = {
            name: 'RouteNotFoundException',
            message: `${request.originalUrl} doesn't exist on this server`,
            extras: {
                help: `Method: ${request.method}`,
            },
            statusCode: NOT_FOUND,
        };
        super(params);

        Object.setPrototypeOf(this, RouteNotFoundException.prototype);
    }
}
