import { schemaComposer } from 'graphql-compose'

import { UserModel, UserTC } from '../../models/user'

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
// API: Implement resolver profile using findOne from UserTC
export const profile = UserTC.mongooseResolvers.findOne()
