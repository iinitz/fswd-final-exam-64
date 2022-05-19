// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
import { ForbiddenError } from 'apollo-server-core'
import { mergeDeepRight } from 'ramda'
import { TweetTC } from "../../models/tweet"
import { ITweet } from "../../types/models"
import { IApolloContext } from '../../types'
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'

export const createTweet = TweetTC.mongooseResolvers.createOne({record : { removeFields : ["_id", "updatedAt", "createdAt", "user", "userId", "retweeted"]}}).wrapResolve((next: ResolverRpCb<ITweet, IApolloContext>) => (rp: ResolverResolveParams<ITweet, IApolloContext>) => {
    if(!rp.context.user._id){
        throw new ForbiddenError("Unauthorized")
    }
    const customRp : Partial<ResolverResolveParams<ITweet , IApolloContext>> = {
        args: {
            record : {
                userId : rp.context.user?._id,
            },
        },
    }
    const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<ITweet, IApolloContext>
    return next(newRp) as Promise<ITweet>
})