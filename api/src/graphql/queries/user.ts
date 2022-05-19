import { ResolverResolveParams, schemaComposer } from 'graphql-compose'

import { UserModel, UserTC } from '../../models/user'
import { IApolloContext } from '../../types'
import { IUser } from '../../types/models'
interface IUserArgs {
  username: string
}

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
// API: Implement resolver profile using findOne from UserTC
export const profile = schemaComposer.createResolver({
  name: 'profile',
  kind: 'query',
  type: UserTC.mongooseResolvers.findMany().getType(),
  args: {
    username: 'String!',
  },
  resolve: async ({ args }: ResolverResolveParams<IUser, IApolloContext, IUserArgs>) => {
    const { username } = args
    const user = await UserModel.findOne({ username })
    if (!user) {
      return []
    }
    const records = await UserModel.find({ userId: user._id as string }).sort({ createdAt: -1 }).lean()
    return records
  },
})