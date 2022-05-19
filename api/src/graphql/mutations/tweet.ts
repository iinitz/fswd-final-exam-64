// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
import { TweetModel, TweetTC } from "../../models/tweet";
import { ForbiddenError } from 'apollo-server-core'
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'


import { IApolloContext } from '../../types'
import { IFollower } from '../../types/models'

// xport const createTweet = schemaComposer.createResolver({
//   name: 'createTweet',
//   kind: 'mutation',
//   type: TweetTC.getType(),
//   args: {
//     userId: 'String!',
//     text: "String!"
//   },
//   resolve: async ({ args }) => {
//     const { userId, text } = args
//     const userId = await TweetModel.create({
//       userId: userId,
//       text: text
//     })
    
//   }
// })

// export const createTweet = TweetTC.mongooseResolvers.createOne({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next: ResolverRpCb<IFollower, IApolloContext>) => (rp: ResolverResolveParams<IFollower, IApolloContext>) => {
//   if (!rp.context.user) {
//     throw new ForbiddenError('Unauthorized')
//   }
//   const customRp: Partial<ResolverResolveParams<IFollower, IApolloContext>> = {
//     args: {
//       record: {
//         userId: rp.context.user?._id,
//       },
//     },
//   }
//   const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<IFollower, IApolloContext>
//   return next(newRp) as Promise<IFollower>
// })