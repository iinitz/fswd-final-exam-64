// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
import { ForbiddenError } from 'apollo-server-core'
import { mergeDeepRight } from 'ramda'

import { TweetTC } from '../../models/tweet'

export const createTweet = TweetTC.mongooseResolvers.createOne({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next) => (rp) => {
  if (!rp.context.user) {
    throw new ForbiddenError('Unauthorized')
  }
  const customRp = {
    args: {
      record: {
        userId: rp.context.user?._id,
      },
    },
  }
  const newRp = mergeDeepRight(rp, customRp)
  return next(newRp)
})
