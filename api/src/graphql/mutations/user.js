/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
import { schemaComposer } from 'graphql-compose'
import { UserModel, UserTC } from '../../models/user'
import jsonwebtoken from 'jsonwebtoken'

const generateUserToken = (user) => jsonwebtoken.sign(
  {
    _id: user._id,
  }, // payload
  process.env.JWT_SECRET, // secret
  {
    algorithm: 'HS256',
    expiresIn: '1d',
  }, // options
)
// - create token using generateToken
// - payload: { _id: user._id }
// - secret: process.env.JWT_SECRET

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
    password: 'String!',
  },
  resolve: async ({ args }) => {
    const { username, password } = args
    const user = await UserModel.findOne({ username: username.toLowerCase() })
    if (!user) {
    //   throw new UserInputError('Username not found')
      return {
        status: 'Failed',
        message: `Username ${username} not found`,
        token: null,
      }
    }
    const validPassword = await user.verifyPassword(password)
    if (!validPassword) {
    //   throw new AuthenticationError('Password incorrect')
      return {
        status: 'Failed',
        message: 'Incorrect password',
        token: null,
      }
    }
    const token = generateUserToken(user)
    return {
      status: 'Success',
      message: 'Login success',
      token,
    }
  },

})

export const register = UserTC.mongooseResolvers.createOne()
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
