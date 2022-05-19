// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
import { schemaComposer } from 'graphql-compose'

import { LikeTC, LikeModel } from '../../models/like'

const UnlikePayloadOTC = schemaComposer.createObjectTC({
  name: 'UnlikePayload',
  fields: {
    message: 'String!'
  },
})
export const like = schemaComposer.createResolver({
  name: 'like',
  kind: 'mutation',
  type: LikeTC.getType(),
  args: {
    tweetId: 'MongoID!',
  },
  resolve: async ({ context, args }) => {
    const { tweetId } = args
    const userId : string = context.user?._id as string
    return LikeModel.create({ tweetId, userId })
  },
})

export const unlike = schemaComposer.createResolver({
  name: 'unlike',
  kind: 'mutation',
  type: UnlikePayloadOTC,
  args: {
    tweetId: 'MongoID!',
  },
  resolve: async ({ context, args }) => {
    const { tweetId } = args
    const userId : string = context.user?._id as string
    await LikeModel.deleteOne({ tweetId, userId })
    return {
      message:'Unliked'
    }
  },
})
