import { LikeModel, LikeTC } from '../../models/like';
import { Schema } from 'mongoose'

import { TweetModel, TweetTC } from '../../models/tweet'
import { UserTC } from '../../models/user'
import { IApolloContext } from '../../types'
import { ITweet } from '../../types/models'

TweetTC.addRelation(
  'user',
  {
    resolver: () => UserTC.getResolver('findById'),
    prepareArgs: {
      _id: (source) => source.userId,
    },
    projection: { userId: 1 },
  },
)
// API: Implement retweet relation here
TweetTC.addRelation(
  'retweet',
  {
    resolver: UserTC.getResolver('findById'),
    projection: { retweetId: 1 },
    prepareArgs: {
      _id: (tweet) => tweet.retweetId
    }
  }
)
// API: Implement retweetsCount relation here
TweetTC.addRelation(
  'retweetsCount',
  {
    resolver: () => TweetTC.mongooseResolvers.count(),
    prepareArgs: {
      filter: (source) => ({
        retweetId: source._id,
      }),
    },
    projection: { _id: 1 },
  },
)
// API: Implement likesCount relation here
TweetTC.addRelation(
  'likesCount',
  {
    resolver: () => LikeTC.mongooseResolvers.count(),
    prepareArgs: {
      filter: (source) => ({
        tweetId: source._id,
      }),
    },
    projection: { _id: 1 },
  },
)

TweetTC.addFields({
  retweeted: {
    type: 'Boolean',
    resolve: async (source, _args, context) => {
      if (!context.user) {
        return false
      }
      const { user: { _id: userId } } = context
      const retweet = await TweetModel.findOne({
        userId,
        retweetId: source._id,
      })
      return !!retweet
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
  liked: {
    type: 'Boolean',
    resolve: async (source, _args, context) => {
      if (!context.user) {
        return false
      }
      const { user: { _id: userId } } = context
      const like = await LikeModel.findOne({
        userId,
        tweetId: source._id,
      })
      return !!like
    },
  },
})
