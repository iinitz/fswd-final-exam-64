import { TweetTC } from "../../models/tweet"
import { ITweet } from "../../types/models"
import { ForbiddenError } from 'apollo-server-core'
import { IApolloContext } from '../../types'
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'

// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const tweet = TweetTC.mongooseResolvers.createOne({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next: ResolverRpCb<ITweet, IApolloContext>) => (rp: ResolverResolveParams<ITweet, IApolloContext>) => {
    if (!rp.context.user) {
      throw new ForbiddenError('Unauthorized')
    }
    const customRp: Partial<ResolverResolveParams<ITweet, IApolloContext>> = {
      args: {
        record: {
          userId: rp.context.user?._id,
        },
      },
    }
    const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<ITweet, IApolloContext>
    return next(newRp) as Promise<ITweet>
  })