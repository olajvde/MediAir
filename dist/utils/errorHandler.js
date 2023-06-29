"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
//ERROR HANDLING MIDDLEWARE
const errorHandler = (err, req, res, next) => {
    // Handle the error
    console.error(err.message);
    return res.status(500).send({
        statusCode: 500,
        statusMessage: "Something went wrong",
        data: err.message,
    });
};
exports.errorHandler = errorHandler;
