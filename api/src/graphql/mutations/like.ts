import { LikeTC, LikeModel } from '../../models/like'

import { ForbiddenError } from 'apollo-server-core'
import { ResolverResolveParams, ResolverRpCb, schemaComposer } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'
import { ILike } from '../../types/models'
import { IApolloContext } from '../../types'

// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const like = schemaComposer.createResolver({
    name: 'like',
    kind: 'mutation',
    type: LikeTC.getType(),
    resolve: async ({ context }: ResolverResolveParams<ILike, IApolloContext>) => {
      if (!context.user) {
        return null
      }           
      const { user: { _id: userId }} = context
      const user = await LikeModel.find()
      return user
    },
  })
// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const unlike = schemaComposer.createResolver({
  name: 'unlike',
  kind: 'mutation',
  type: LikeTC.getType(),
  resolve: async ({ context }: ResolverResolveParams<ILike, IApolloContext>) => {
    if (!context.user) {
      return null
    }
    const { user: { _id: userId }} = context
    const user = await LikeModel.find()
    return user
  },
})
