import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'

import { LikeTC } from '../../models/like'
import { IApolloContext } from '../../types'
import { ILike } from '../../types/models'

// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
// export const addLike = LikeTC.mongooseResolvers.updateById().wrapResolve((next: ResolverRpCb<ILike, IApolloContext>) => (rp: ResolverResolveParams<ILike, IApolloContext>) => {
//     if (rp.args?._id !== rp.context?.user._id) {
//         return next(rp) as Promise<ILike>
//     }
//     return null
// })

// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
