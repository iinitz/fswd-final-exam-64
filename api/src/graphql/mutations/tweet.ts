// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
import { ForbiddenError } from 'apollo-server-core'
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'
import { FollowerTC } from '../../models/follower'
import { IApolloContext } from '../../types'
import { IFollower } from '../../types/models'

export const createTweet = FollowerTC.mongooseResolvers.createOne({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next: ResolverRpCb<IFollower, IApolloContext>) => (rp: ResolverResolveParams<IFollower, IApolloContext>) => {
  if (!rp.context.user) {
    throw new ForbiddenError('Unauthorized')
  }
  const customRp: Partial<ResolverResolveParams<IFollower, IApolloContext>> = {
    args: {
      record: {
        userId: rp.context.user?._id,
      },
    },
  }
  const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<IFollower, IApolloContext>
  return next(newRp) as Promise<IFollower>
})
