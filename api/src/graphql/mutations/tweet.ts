import { schemaComposer, ResolverResolveParams } from "graphql-compose";
import { TweetModel, TweetTC } from "../../models/tweet";
import { ITweet } from "../../types/models";
import { IApolloContext } from '../../types'



// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const createTweet = schemaComposer.createResolver({
    name: 'createTweet',
    kind: 'mutation',
    type: TweetTC.getType(),
    resolve: async ({ context }: ResolverResolveParams<ITweet, IApolloContext>) => {
      if (!context.user) {
        return null
      }
      const { user: { _id: userId } } = context
      const user = await TweetModel.findById(userId)
      return user
    },
  })