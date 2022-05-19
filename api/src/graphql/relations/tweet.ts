import { Schema } from 'mongoose'

import { LikeModel, LikeTC } from '../../models/like'
import { TweetModel, TweetTC } from '../../models/tweet'
import { UserTC } from '../../models/user'
import { IApolloContext } from '../../types'
import { ITweet } from '../../types/models'

TweetTC.addRelation(
  'user',
  {
    resolver: () => UserTC.mongooseResolvers.findById(),
    prepareArgs: {
      _id: (source: ITweet) => source.userId,
    },
    projection: { userId: 1 },
  },
)
// API: Implement retweet relation here
TweetTC.addRelation(
  'retweet',
  {
    resolver: () => TweetTC.mongooseResolvers.findOne(),
    prepareArgs: {
      filter: (source: ITweet) => ({
        _id: source?.retweetId,
      }),
    },
    projection: { retweet: 1 },
  },
)
// API: Implement retweetsCount relation here
TweetTC.addRelation(
  'retweetsCount',
  {
    resolver: () => TweetTC.mongooseResolvers.count(),
    prepareArgs: {
      filter: (source: ITweet) => ({
        retweetId: source?._id,
      }),
    },
    projection: { retweetsCount: 1 },
  },
)
// API: Implement likesCount relation here
TweetTC.addRelation(
  'likesCount',
  {
    resolver: () => LikeTC.mongooseResolvers.count(),
    prepareArgs: {
      filter: (source: ITweet) => ({
        tweetId: source?._id
      }),
    },
    projection: { likesCount: 1 },
  },
)
TweetTC.addFields({
  retweeted: {
    type: 'Boolean',
    resolve: async (source: ITweet, _args, context: IApolloContext) => {
      if (!context.user) {
        return false
      }
      const { user: { _id: userId } } = context
      const retweet = await TweetModel.findOne({
        userId,
        retweetId: source._id as Schema.Types.ObjectId,
      })
      return !!retweet
    },
  },
  liked: {
    type: 'Boolean',
    resolve: async (source: ITweet, _args, context: IApolloContext) => {
      if (!context.user) {
        return false
      }
      const { user: { _id: userId } } = context
      const like = await LikeModel.findOne({
        userId,
        tweetId: source._id as Schema.Types.ObjectId,
      })
      return !!like
    },
  },
  /*
    API: Implement field liked here
    type: Boolean
    resolve:
      - if not context.user return false
      - findOne like by tweetId from source._id and userId from context.user._id
      - return true if found
  */
})
