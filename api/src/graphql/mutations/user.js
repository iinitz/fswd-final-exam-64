import { schemaComposer } from 'graphql-compose'
import { resolve } from 'path'
import { UserTC, UserModel } from '../../models/user'
import { generateToken } from '../../lib/jwtUtils'


export const LoginPayloadOTC = schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    message: 'String!',
    token: 'String',
  },
})

schemaComposer.Mutation.addFields({
  login: {
    type: LoginPayloadOTC,
    args: {
      username: "String!",
      password: "String!"
    },
    resolve: async (_, {username, password}) => {
      try {
      const user = await UserModel.findOne({username: username.toLowerCase()})
      if (!user) {
        return {
          message: `Username ${username} not found`,
          token: null,
        }
      }
      const validPassword = await user.verifyPassword(password)
      if (!validPassword) {
        return {
          message: 'Incorrect password',
          token: null,
        }
      }
      const token = generateToken({ _id: user._id }, process.env.JWT_SECRET)
      return {
        message: 'Login success',
        token,
      }     
      } catch(err){
      return {
        message: "Server error",
        token: null,
      }
    }
    }
  }
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
export const register = UserTC.mongooseResolvers.createOne()