"use strict";
exports.__esModule = true;
exports.FollowerTc = exports.FollowerModel = void 0;
var mongoose_1 = require("mongoose");
var FollowerSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    followedId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true });
exports.FollowerModel = (0, mongoose_1.model)('Follower', FollowerSchema);
// API: Implement FollowerTC here
var FollowerTC = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    followedId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
});
exports.FollowerTc = (0, mongoose_1.model)('Follower', FollowerTC);
