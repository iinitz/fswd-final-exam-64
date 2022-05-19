"use strict";
exports.__esModule = true;
exports.unfollow = exports.follow = void 0;
var apollo_server_core_1 = require("apollo-server-core");
var ramda_1 = require("ramda");
var follower_1 = require("../../models/follower");
exports.follow = follower_1.FollowerTc.mongooseResolvers.createOne({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve(function (next) { return function (rp) {
    var _a;
    if (!rp.context.user) {
        throw new apollo_server_core_1.ForbiddenError('Unauthorized');
    }
    var customRp = {
        args: {
            record: {
                userId: (_a = rp.context.user) === null || _a === void 0 ? void 0 : _a._id
            }
        }
    };
    var newRp = (0, ramda_1.mergeDeepRight)(rp, customRp);
    return next(newRp);
}; });
exports.unfollow = follower_1.FollowerTc.mongooseResolvers.removeOne({ filter: { isRequired: true, requiredFields: ['followedId'], removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve(function (next) { return function (rp) {
    var _a;
    if (!rp.context.user) {
        throw new apollo_server_core_1.ForbiddenError('Unauthorized');
    }
    var customRp = {
        args: {
            filter: {
                userId: (_a = rp.context.user) === null || _a === void 0 ? void 0 : _a._id
            }
        }
    };
    var newRp = (0, ramda_1.mergeDeepRight)(rp, customRp);
    return next(newRp);
}; });
/*
  JS code:
  export const follow = FollowerTc.mongooseResolvers.createOne({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next) => (rp) => {
    if (!rp.context.user) {
      throw new ForbiddenError('Unauthorized')
    }
    const customRp = {
      args: {
        record: {
          userId: rp.context.user?._id,
        },
      },
    }
    const newRp = mergeDeepRight(rp, customRp)
    return next(newRp)
  })
  export const unfollow = FollowerTc.mongooseResolvers.removeOne({ filter: { isRequired: true, requiredFields: ['followedId'], removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next) => (rp) => {
    if (!rp.context.user) {
      throw new ForbiddenError('Unauthorized')
    }
    const customRp = {
      args: {
        filter: {
          userId: rp.context.user?._id,
        },
      },
    }
    const newRp = mergeDeepRight(rp, customRp)
    return next(newRp)
  })
*/
