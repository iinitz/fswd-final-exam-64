// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)

import { LikeTC } from "../../models/like";

// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const like = LikeTC.mongooseResolvers.createOne()
export const unlike = LikeTC.mongooseResolvers.removeById()