"use strict";
exports.__esModule = true;
exports.decodeToken = exports.generateToken = exports.getReqToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var getReqToken = function (req) {
    var _a, _b;
    var cookies = req.cookies, headers = req.headers;
    if (cookies === null || cookies === void 0 ? void 0 : cookies.token) {
        return cookies.token;
    }
    if (((_b = (_a = headers === null || headers === void 0 ? void 0 : headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) === null || _b === void 0 ? void 0 : _b[0]) === 'Bearer') {
        return headers.authorization.split(' ')[1];
    }
    return null;
};
exports.getReqToken = getReqToken;
var generateToken = function (payload, secret) { return (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: '1d' }); };
exports.generateToken = generateToken;
var decodeToken = function (token, secret) {
    if (token) {
        return (0, jsonwebtoken_1.verify)(token, secret);
    }
    return null;
};
exports.decodeToken = decodeToken;
