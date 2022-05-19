"use strict";
exports.__esModule = true;
exports.UserTC = exports.UserModel = void 0;
var graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
var mongoose_1 = require("mongoose");
var passwordUtils_1 = require("../lib/passwordUtils");
var UserSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    }
}, { timestamps: true });
UserSchema.pre('save', passwordUtils_1.preSaveHook);
UserSchema.pre('updateOne', passwordUtils_1.preUpdateHook);
UserSchema.method('verifyPassword', passwordUtils_1.verifyPassword);
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.UserTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.UserModel).removeField('password');
