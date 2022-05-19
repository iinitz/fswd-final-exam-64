// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)

import { LikeTC } from '../../models/like'

// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)

export const like = LikeTC.mongooseResolvers.createOne({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next) => (rp) => {
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

export const unlike = LikeTC.mongooseResolvers.removeOne({ filter: { isRequired: true, requiredFields: ['tweetId'], removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next) => (rp) => {
  if (!rp.context.user) {
    throw new ForbiddenError('Unauthorized')
  }
  const customRp = {
    args: {
      filter: {
        userId: rp.context.user?._id,
      },
    },
  }
  const newRp = mergeDeepRight(rp, customRp)
  return next(newRp)
})
