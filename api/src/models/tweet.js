"use strict";
exports.__esModule = true;
exports.TweetModel = void 0;
var mongoose_1 = require("mongoose");
var TweetSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    text: {
        type: String,
        trim: true,
        "default": ''
    },
    retweetId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tweet',
        "default": null,
        index: true
    }
}, { timestamps: true });
exports.TweetModel = (0, mongoose_1.model)('Tweet', TweetSchema);
// API: Implement TweetTC here
