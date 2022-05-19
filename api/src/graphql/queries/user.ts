import { ResolverResolveParams, schemaComposer } from 'graphql-compose'

import { UserModel, UserTC } from '../../models/user'
import { IApolloContext } from '../../types'
import { IUser } from '../../types/models'

export const me = schemaComposer.createResolver({
  name: 'me',
  kind: 'query',
  type: UserTC.getType(),
  resolve: async ({ context }: ResolverResolveParams<IUser, IApolloContext>) => {
    if (!context.user) {
      return null
    }
    const { user: { _id: userId } } = context
    const user = await UserModel.findById(userId)
    return user
  },
})

interface IProfile{
  username:string
}
// API: Implement resolver profile using findOne from UserTC
export const profile = schemaComposer.createResolver({
  name: 'profile',
  kind: 'query',
  type: UserTC.getType(),
  args:{
    username: 'String!'
  },
  resolve: async ({ args } : ResolverResolveParams<IProfile, IApolloContext> ) => {
    const { username } = args
    return await UserModel.findOne({ username })
  }
})