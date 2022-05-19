import { schemaComposer } from 'graphql-compose'
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
import { generateToken } from '../../lib/jwtUtils'
import { verifyPassword } from '../../lib/passwordUtils'
import { UserModel } from '../../models/user'

export const login = schemaComposer.createResolver({
  name: 'login',
  kind: 'mutation',
  type: LoginPayloadOTC,
  args: {
    username: 'String!',
    password: 'String!',
  },
  resolve: async ({ args }) => {
    const { username, password } = args
    const user = await UserModel.findOne({ username: username.toLowerCase() })
    if (!user) {
      // throw new UserInputError('Username not found')
      return {
        message: `Username ${username} not found`,
        token: null,
      }
    }
    const validPassword = await verifyPassword(user, password)
    if (!validPassword) {
      // throw new AuthenticationError('Password incorrect')
      return {
        message: 'Incorrect Password',
        token: null,
      }
    }
    const token = generateToken({
      _id: user._id
    }, process.env.JWT_SECRET)
    return {
      message: 'Login success',
      token,
    }
  },
})





// API: Implement resolver register using createOne from UserTC
export const register = UserTC.mongooseResolvers.createOne({ record: { removeFields: ['_id', 'createdAt', 'updatedAt'] }})
