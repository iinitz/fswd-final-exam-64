import { schemaComposer } from 'graphql-compose'

import { generateToken } from '../../lib/jwtUtils'
import { UserModel, UserTC } from '../../models/user'

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
  kind: 'query',
  type: LoginPayloadOTC.getType(),
  args: { username: 'String', password: 'String' },
  resolve: async ({ context }) => {
    try {
      const { username, password } = context

      const user = await UserModel.findOne({ username })
      if (!user) throw new Error(`Username ${username} not found`)
      if (!user.verifyPassword(password)) throw new Error('Incorrect password')

      const token = generateToken({ _id: user._id }, process.env.JWT_SECRET)
      return { token, message: 'Login success' }
    } catch (error) {
      throw new Error('Server error')
    }
  },
})

// API: Implement resolver register using createOne from UserTC
export const register = UserTC.mongooseResolvers.createOne()
