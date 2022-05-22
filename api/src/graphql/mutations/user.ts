import { ResolverResolveParams, schemaComposer } from 'graphql-compose'
import { Schema } from 'mongoose'

import { generateToken } from '../../lib/jwtUtils'
import { UserModel, UserTC } from '../../models/user'
import { IApolloContext, IJwtUserPayload } from '../../types'
import { ILoginArgs } from '../../types/graphql'
import { IUser } from '../../types/models'

const LoginPayloadOTC = schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    message: 'String!',
    token: 'String',
  },
})
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
export const login = schemaComposer.createResolver({
  name: 'login',
  kind: 'mutation',
  type: LoginPayloadOTC,
  args: {
    username: 'String!',
    password: 'String!',
  },
  resolve: async ({ args }: ResolverResolveParams<IUser, IApolloContext, ILoginArgs>) => {
    try {
      const { username, password } = args
      const user = await UserModel.findOne({ username: username.toLowerCase() })
      if (!user) {
        return {
          message: `Username ${username} not found`,
        }
      }
      const isValid = await user.verifyPassword(password)
      if (!isValid) {
        return {
          message: 'Incorrect password',
        }
      }
      const payload: IJwtUserPayload = {
        _id: user._id as Schema.Types.ObjectId,
      }
      const token = generateToken(payload, process.env.JWT_SECRET ?? '')
      return {
        message: 'Login success',
        token,
      }
    } catch (err) {
      return {
        message: 'Server error',
      }
    }
  },
})
// API: Implement resolver register using createOne from UserTC
export const register = UserTC.mongooseResolvers.createOne()
