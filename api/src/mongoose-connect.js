"use strict";
var _a;
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var uri = (_a = process.env.MONGO_HOST) !== null && _a !== void 0 ? _a : '';
var options = {
    dbName: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS
};
exports["default"] = mongoose_1["default"].connect(uri, options);
