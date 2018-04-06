const errorHandler = (res, errorMessage, errorCode) => {
    return errorCode === 'invalidToken' ?
        res.status(403).send({
            success: false,
            message: errorMessage,
            code: errorCode,
        }) : res.status(400).send({
            success: false,
            message: errorMessage,
        });
}

module.exports = {
    errorHandler,
};
