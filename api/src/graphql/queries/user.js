import { ResolverResolveParams, schemaComposer } from 'graphql-compose'

import { UserModel, UserTC } from '../../models/user'

// API: Implement resolver profile using findOne from UserTC
export const checkUsername = UserTC.mongooseResolvers.findOne({
  filter: {
    isRequired: true,
    requiredFields: ['username']
  }
})

export const getUser = UserTC.mongooseResolvers.findById({
  filter: {
    isRequired: true,
    requiredFields: ['_id']
  }
})

export const me = schemaComposer.createResolver({
  name: 'me',
  kind: 'query',
  type: UserTC.getType(),
  resolve: async ({ context }) => {
    if (!context.user) {
      return null
    }
    const { user: { _id: userId } } = context
    const user = await UserModel.findById(userId)
    return user
  },
})
