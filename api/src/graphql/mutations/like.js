import { LikeTC } from "../../models/like";

// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const like = LikeTC.mongooseResolvers.updateOne({
    filter: async ({ context }) => context.user._id
})
// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const unlike = LikeTC.mongooseResolvers.updateOne({
    filter: async ({ context }) => context.user._id
})