import { schemaComposer, ResolverResolveParams } from 'graphql-compose'
import { UserTC, UserModel } from '../../models/user'
import { IApolloContext } from '../../types'
import { IUser } from '../../types/models'

const LoginPayloadOTC = schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    message: 'String!',
    token: 'String',
  },
});
/*
  API: Implement resolver login
  type: LoginPayloadOTC
  args: required username and password type String
  resolve:
    - find user by lowercase username
    - if user not found return error message `Username ${username} not found`
    - check password using user.verifyPassword(password)
    - if password not match return error message "Incorrect password"
    - create token using generateToken
      - payload: { _id: user._id }
      - secret: process.env.JWT_SECRET
    - return token and message "Login success"
    - if error return error message "Server error"
*/

// API: Implement resolver register using createOne from UserTC
export const register = schemaComposer.createResolver({
  name: 'register',
  kind: 'mutation',
  type: UserTC.getType(),
  resolve: async ({ context }: ResolverResolveParams<IUser, IApolloContext>) => {
    if (!context.user) {
      return null
    }
    const { user: { _id: userId }} = context
    const user = await UserModel.find()
    return user
  },
})
