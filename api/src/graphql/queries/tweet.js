import { ResolverResolveParams, schemaComposer } from 'graphql-compose'

import { FollowerModel } from '../../models/follower'
import { TweetModel, TweetTC } from '../../models/tweet'
import { UserModel } from '../../models/user'
import { IApolloContext } from '../../types'
import { ITweet } from '../../types/models'


export const tweets = schemaComposer.createResolver({
  name: 'tweets',
  kind: 'query',
  type: TweetTC.mongooseResolvers.findMany().getType(),
  args: {
    username: 'String!',
  },
  resolve: async ({ args }) => {
    const { username } = args
    const user = await UserModel.findOne({ username })
    if (!user) {
      return []
    }
    const records = await TweetModel.find({ userId: user._id }).sort({ createdAt: -1 }).lean()
    return records
  },
})
export const feed = schemaComposer.createResolver({
  name: 'feed',
  kind: 'query',
  type: TweetTC.mongooseResolvers.findMany().getType(),
  resolve: async ({ context }) => {
    if (!context.user) {
      return []
    }
    const { user: { _id: userId } } = context
    const followingUsers = await FollowerModel.find({ userId }).lean()
    const followingUserIds = followingUsers.map(({ followedId }) => followedId)
    const records = await TweetModel.find({ userId: { $in: [userId, ...followingUserIds] } }).sort({ createdAt: -1 }).lean()
    return records
  },
})
