// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)

// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
import { LikeTC } from '../../models/like'

export const qq = LikeTC.mongooseResolvers
  .createOne({
    record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] },
  })
  .wrapResolve((next) => (rp) => {
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

