import { ForbiddenError } from 'apollo-server-core'
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'

import { TweetTC } from '../../models/tweet'

// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const createTweet = TweetTC.mongooseResolvers.createOne().wrapResolve((next) => (rp) => {
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