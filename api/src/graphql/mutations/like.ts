import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'

import { LikeTC } from '../../models/like'

export const like = LikeTC.mongooseResolvers.createOne({ })
// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
