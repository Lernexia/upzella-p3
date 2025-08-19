"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.errorHandler = void 0;
var logger_1 = require("../utils/logger");
var errorHandler = function (error, req, res, next) {
    var statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 500;
    var message = (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error';
    logger_1.logger.error("Error ".concat(statusCode, ": ").concat(message), {
        stack: error === null || error === void 0 ? void 0 : error.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip
    });
    res.status(statusCode).json(__assign({ status: 'error', statusCode: statusCode, message: process.env.NODE_ENV === 'production' && statusCode === 500
            ? 'Internal server error'
            : message }, (process.env.NODE_ENV !== 'production' && { stack: error === null || error === void 0 ? void 0 : error.stack })));
};
exports.errorHandler = errorHandler;
var createError = function (message, statusCode) {
    if (statusCode === void 0) { statusCode = 500; }
    var error = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};
exports.createError = createError;
