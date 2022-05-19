import { AuthenticationError, UserInputError } from 'apollo-server-core'
import { ResolverResolveParams, schemaComposer } from 'graphql-compose'

import { UserModel, UserTC } from '../../models/user'
import { IApolloContext } from '../../types'
import { IUser } from '../../types/models'

const LoginPayloadOTC = schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    message: 'String!',
    token: 'String',
  },
})

export const login = schemaComposer.createResolver({
  name: 'login', 
  kind: 'mutation',
  type: LoginPayloadOTC,
  args: {
    username: 'String!',
    password: 'String!'
  },
  resolve: async ({ args }) => {
    const { username, password } = args
    const user = await UserModel.findOne({ username: username.toLowerCase() })
    if (!user) {
      return {
        status: 'failed',
        message: `Username ${username} not found`,
        token: null
      }
    }
    const validPassword = checkPassword(user.verifyPassword(password), password)
    if (!validPassword) {
      return {
        status: 'failed',
        message: "Incorrect password",
        token: null
      }
    }
    const token = generateUserToken(user)
    return {
      status: 'success',
      message: null,
      token
    }
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
// API: Implement resolver register using createOne from UserTC
