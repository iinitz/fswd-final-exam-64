"use strict";
exports.__esModule = true;
exports.LikeModel = void 0;
var mongoose_1 = require("mongoose");
var LikeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    tweetId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true,
        index: true
    }
}, { timestamps: true });
exports.LikeModel = (0, mongoose_1.model)('Like', LikeSchema);
// API: Implement LikeTC here
