import appError from './appError'


// Development Error
const devError = (err, req, res, next) => {
    res.status(500).json({
        status: 'Fail',
        message: err.message,
        stack: err.stack,
        err
    })
}
// 1) #Production Errors
// 1A) @cast Error
const castError = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new appError(message, 400);
}

// 1B) @DuplicateFieldsError
const duplicateFieldsError = (err, req) => {

    let value = err.message.match(/"(.*?)"/g);
    let fieldValue = err.message.match(/\b(mobileNo|email)\b/g);
    const message = `This ${fieldValue} ${value} already register.`;
    return new appError(message, 400);
}

// 1C) @Field ValidationError
const validationErrorDB = (err, req) => {
    const errors = Object.values(err.errors).map(el => el.message);
    return new appError(`${errors.join(', ')}`, 400);
}

// 1D) @JSONwebtone Error Handler
const invalidJsonWebToken = () => {
    return new appError(`!unauthorized, please login again`, 401);
}
const tokenExpiredError = () => {
    return new appError(`Login Expired, please login again`, 401);
}

// 1)#Production error handler
const errorProd = (err, res, req, next) => {
    // operational trusted error message : Send to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });

        // Programing unexpected Errors 
    } else {
        // 1) Console unexpexted errors
        console.error(err);
        // 2) Error sending to client
        return res.status(500).json({
            status: 'Error',
            message: 'Something went wrong.'
        })
    }
}

const globleError = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    if (process.env.NODE_ENV === 'development') {
        return devError(err, req, res, next);
    } else if (process.env.NODE_ENV === 'production') {
        console.log(err)
        let error = err;

        if (err.name === 'CastError') error = castError(error);
        if (err.code === 11000) error = duplicateFieldsError(error, req);
        if (err.name === 'ValidationError') error = validationErrorDB(error);
        if (err.name === 'JsonWebTokenError') error = invalidJsonWebToken();
        if (err.name === 'TokenExpiredError') error = tokenExpiredError();
        errorProd(error, res, req, next);
    }
}

export default globleError;