// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
import { TweetTC } from "../../models/tweet";

export const createTweet = TweetTC.getResolver('createOne')