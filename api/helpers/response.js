const { GenericError } = require('../constants/messages');

const Response = (
    success = false,
    message = GenericError,
    data = {},
    errors = [GenericError]
) => ({ success, message, data, errors });

module.exports = Response;
