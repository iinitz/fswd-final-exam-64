import { ITweet } from './../../types/models';
import { ForbiddenError } from 'apollo-server-core'
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'
import { IApolloContext } from '../../types'

import { ILike } from './../../types/models';
import { LikeTC } from './../../models/like';
// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const like = LikeTC.mongooseResolvers.createOne({}).wrapResolve((next: ResolverRpCb<ILike, IApolloContext>) => (rp: ResolverResolveParams<ILike, IApolloContext>) => {
    if (!rp.context.user) {
        throw new ForbiddenError('Unauthorized')
    }
    const customRp: Partial<ResolverResolveParams<ILike, IApolloContext>> = {
        args: {
            record: {
                userId: rp.context.user?._id,
            },
        },
    }
    const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<ILike, IApolloContext>
    return next(newRp) as Promise<ILike>
})

// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const unlike = LikeTC.mongooseResolvers.removeOne({ filter: { isRequired: true, requiredFields: ['user_id'] } }).wrapResolve((next: ResolverRpCb<ILike, IApolloContext>) => (rp: ResolverResolveParams<ILike, IApolloContext>) => {
    if (!rp.context.user) {
        throw new ForbiddenError('Unauthorized')
    }
    const customRp: Partial<ResolverResolveParams<ILike, IApolloContext>> = {
        args: {
            filter: {
                userId: rp.context.user?._id,
            },
        },
    }
    const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<ILike, IApolloContext>
    return next(newRp) as Promise<ILike>
})