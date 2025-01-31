const ErrorUtil = {};
module.exports = ErrorUtil;

ErrorUtil.APIError = (error, res) => {
    // eslint-disable-next-line no-console
    console.error('Error in API', error);
    return res.status(500).json({
        status: false,
        message: 'Server Error',
        debug: error.message,
    });
};
