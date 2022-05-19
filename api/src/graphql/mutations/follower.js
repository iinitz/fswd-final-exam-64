import { ForbiddenError } from 'apollo-server-core'
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'
import { composeWithMongoose } from 'graphql-compose-mongoose'

import { FollowerTC } from '../../models/follower'






  export const follow = FollowerTC.getResolver({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next) => (rp) => {
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
  export const unfollow = FollowerTC.mongooseResolvers.removeOne({ filter: { isRequired: true, requiredFields: ['followedId'], removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next) => (rp) => {
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

