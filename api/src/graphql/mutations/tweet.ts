import { TweetTC } from '../../models/tweet'
// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)

export const createTweet = TweetTC.getResolver('createOne')