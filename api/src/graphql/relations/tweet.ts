import { Schema } from 'mongoose'

import { TweetModel, TweetTC } from '../../models/tweet'
import { UserTC } from '../../models/user'
import { IApolloContext } from '../../types'
import { ITweet } from '../../types/models'
import { LikeModel } from '../../models/like'
import { LikeTC } from '../../models/like'
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
TweetTC.addRelation(
  'retweet',
  {
    resolver: () => TweetTC.mongooseResolvers.findMany(),
    prepareArgs: {
      filter: (source) => ({
        userId: source.userId as Schema.Types.ObjectId,
      })
    },
    projection: { userId : true}
  }
)
TweetTC.addRelation(
  'retweetsCount',
  {
    resolver: () => TweetTC.mongooseResolvers.count(),
    prepareArgs: {
      filter: (source) => ({
        userId: source.userId as Schema.Types.ObjectId,
      })
    },
    projection: { userId : true}
  }
)
TweetTC.addRelation(
  'likesCount',
  {
    resolver: () => LikeTC.mongooseResolvers.count(),
    prepareArgs: {
      filter: (source) => ({
        tweetId: source._id as Schema.Types.ObjectId,
      })
    },
    projection: { _id : true }
  }
)
// API: Implement retweet relation here
// API: Implement retweetsCount relation here
// API: Implement likesCount relation here
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
      const liked = await LikeModel.findOne({
        userId,
        tweetId: source._id as Schema.Types.ObjectId,
      })
      return !!liked
    }
  }
  /*
    API: Implement field liked here
    type: Boolean
    resolve:
      - if not context.user return false
      - findOne like by tweetId from source._id and userId from context.user._id
      - return true if found
  */
})
