// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
import { LikeTC } from "../../models/like";
import { ForbiddenError } from 'apollo-server-core'
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'

import { FollowerTC } from '../../models/follower'
import { IApolloContext } from '../../types'
import { IFollower } from '../../types/models'

export const like = FollowerTC.mongooseResolvers.createOne({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next) => (rp) => {
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
  export const unlike = FollowerTC.mongooseResolvers.removeOne({ filter: { isRequired: true, requiredFields: ['followedId'], removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next) => (rp) => {
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
// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
