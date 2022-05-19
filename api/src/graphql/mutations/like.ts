// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)

import { ForbiddenError } from "apollo-server-core";
import { ResolverResolveParams, ResolverRpCb } from "graphql-compose";
import { merge, mergeDeepRight } from "ramda";
import { LikeTC } from "../../models/like";
import { IApolloContext } from "../../types";
import { ILike } from "../../types/models";

export const like = LikeTC.mongooseResolvers.createOne({record : { removeFields : ["_id", "updatedAt", "createdAt","userId"]}}).wrapResolve((next: ResolverRpCb<ILike, IApolloContext>) => (rp: ResolverResolveParams<ILike, IApolloContext>) => {
    if(!rp.context.user._id){
        throw new ForbiddenError("Unauthorized")
    }
    const customRp : Partial<ResolverResolveParams<ILike , IApolloContext>> = {
        args: {
            record : {
                userId : rp.context.user?._id,
            },
        },
    }
    const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<ILike, IApolloContext>
    return next(newRp) as Promise<ILike>
})

export const unlike = LikeTC.mongooseResolvers.removeOne({ filter: { isRequired: true, requiredFields: ['tweetId'], removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next: ResolverRpCb<ILike, IApolloContext>) => (rp: ResolverResolveParams<ILike, IApolloContext>) => {
    if(!rp.context.user._id){
        throw new ForbiddenError("Unauthorized")
    }
    const customRp : Partial<ResolverResolveParams<ILike , IApolloContext>> = {
        args: {
            record : {
                userId : rp.context.user?._id,
            },
        },
    }
    const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<ILike, IApolloContext>
    return next(newRp) as Promise<ILike>
})