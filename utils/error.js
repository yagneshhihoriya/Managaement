exports.errorHandling = (err, req, res, next) => {
    res.status(500).json({
        error: err.message,
        msg: "Internal Server Error",
        success: false,
    });
};

exports.errorWrapper = (fun) => {
    return async (req, res, next) => {
        try {
            await fun(req, res, next)
        } catch (ex) {
            next(ex)
        }
    }
}