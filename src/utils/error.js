const ErrorUtil = {};
module.exports = ErrorUtil;

ErrorUtil.APIError = (error, res) => {
    // eslint-disable-next-line no-console
    console.error('Error in API', error.stack);
    return res.json({
        status: false,
        message: error.message,
    });
};
