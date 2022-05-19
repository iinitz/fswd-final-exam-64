import { ResolverResolveParams, schemaComposer } from "graphql-compose"
import { TweetModel, TweetTC } from "../../models/tweet"
import { IApolloContext } from '../../types'
import { ITweet } from '../../types/models'
import { UserModel } from '../../models/user'

interface ITweetsArgs {
  username: string,
  text: string,
  retweetId: string
}

// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const createTweet = schemaComposer.createResolver({
    name: 'crerateTweet',
    kind: 'mutation',
    type: TweetTC.mongooseResolvers.createOne().getType(),
    args: {
      username: 'String!',
      text: 'String!',
      retweetId: 'String!'
    },
    resolve: async ({ args }: ResolverResolveParams<ITweet, IApolloContext, ITweetsArgs>) => {
      const { username, text, retweetId } = args
      const user = await UserModel.findOne({ username })
      if (!user) {
        return []
      }
      const records = await TweetModel.create({ userId: user._id as string, text: text, retweetId: retweetId})
      return records
    },
  })

  export const updateTweet = schemaComposer.createResolver({
    name: 'crerateTweet',
    kind: 'mutation',
    type: TweetTC.mongooseResolvers.updateOne().getType(),
    args: {
      username: 'String!',
      text: 'String!',
      retweetId: 'String!'
    },
    resolve: async ({ args }: ResolverResolveParams<ITweet, IApolloContext, ITweetsArgs>) => {
      const { username, text, retweetId } = args
      const user = await UserModel.findOne({ username })
      if (!user) {
        return []
      }
      const records = await TweetModel.updateOne({ userId: user._id as string, text: text, retweetId: retweetId})
      return records
    },
  })