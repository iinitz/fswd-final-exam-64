import { Schema } from "mongoose";

import { FollowerModel } from "../../models/follower";
import { TweetTC } from "../../models/tweet";
import { UserTC } from "../../models/user";
import { IApolloContext } from "../../types";
import { IUser } from "../../types/models";

// API: Implement followingCount relation here
// API: Implement followersCount relation here
UserTC.addRelation("tweetsCount", {
  resolver: () => TweetTC.mongooseResolvers.count(),
  prepareArgs: {
    filter: (source) => ({
      userId: source._id,
    }),
  },
  projection: { _id: 1 },
});
UserTC.addFields({
  following: {
    type: "Boolean",
    resolve: async (source, _args, context) => {
      if (!context.user) {
        return false;
      }
      const {
        user: { _id: userId },
      } = context;
      if (userId === source._id) {
        return null;
      }
      const following = await FollowerModel.findOne({
        userId,
        followedId: source._id,
      });
      return !!following;
    },
  },
});
