// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
import { schemaComposer } from 'graphql-compose'

import { TweetTC, TweetModel } from '../../models/tweet'

export const createTweet = schemaComposer.createResolver({
  name: 'createTweet',
  kind: 'mutation',
  type: TweetTC.getType(),
  args: {
    text: 'String!',
  },
  resolve: async ({ context, args }) => {
    const { text } = args
    const userId = context.user?._id as string
    const tweet = await TweetModel.create({ text, userId })
    return tweet
  },
})
