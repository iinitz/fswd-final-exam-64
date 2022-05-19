import { TweetTC } from "../../models/tweet";
import { UserTC } from "../../models/user";
import { LikeTC } from "../../models/like";

// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const like = TweetTC.getResolver('createById')
// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const unlike = TweetTC.getResolver('removeById')