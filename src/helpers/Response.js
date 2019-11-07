/**
 * @class Response
 */
export default class Response {
    /**
     * @static
     * @param {object} response
     * @param {Number} code
     * @param {string} message
     * @returns {object} object
     * @memberof Response
    */
    static error(response, code, message) {
        return response.status(code).json({
            status: code,
            errors: {
                global: message,
            }
        });
    }

    /**
     * @static
     * @param {object} response
     * @param {object} code
     * @param {*} payload
     * @param {string} message
     * @returns {object} object
     * @memberof Response
    */
    static success(response, code, payload, message = 'Success') {
        return response.status(code).json({
            status: code,
            message,
            payload
        });
    }
}