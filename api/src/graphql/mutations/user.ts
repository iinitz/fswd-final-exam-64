import { schemaComposer } from 'graphql-compose'

import { generateToken } from '../../lib/jwtUtils'
import { UserModel, UserTC } from '../../models/user'
import { IJwtUserPayload } from '../../types'
import { ILoginArgs } from '../../types/graphql'

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
export const login = schemaComposer.createResolver<ILoginArgs, ILoginArgs>({
  name: 'login',
  kind: 'mutation',
  type: LoginPayloadOTC,
  args: {
    username: 'String!',
    password: 'String!',
  },
  resolve: async ({ args }) => {
    try {
      const { username, password } = args
      const user = await UserModel.findOne({ username: username.toLowerCase() })
      if (!user) {
        return {
          status: 'failed',
          message: `Username ${username} not found`,
          token: null,
        }
      }
      const validPassword = await user.verifyPassword(password)
      if (!validPassword) {
        return {
          status: 'failed',
          message: 'Incorrect password',
          token: null,
        }
      }
      const payload: IJwtUserPayload = { _id: user._id }
      const token = generateToken(payload, process.env.JWT_SECRET ?? '')
      return {
        status: 'success',
        message: 'Login success',
        token,
      }
    } catch (error) {
      console.error(error)
      return {
        status: 'error',
        message: 'Server error',
        token: null,
      }
    }
  },
})

// API: Implement resolver register using createOne from UserTC
export const register = UserTC.mongooseResolvers.createOne()
