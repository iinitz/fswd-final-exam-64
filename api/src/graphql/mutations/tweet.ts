// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
import { schemaComposer } from 'graphql-compose'
import { TweetModel, TweetTC } from '../../models/tweet'

const tweet = TweetTC.mongooseResolvers.findMany()