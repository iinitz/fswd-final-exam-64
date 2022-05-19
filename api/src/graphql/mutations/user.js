import { schemaComposer } from 'graphql-compose'
import { generateToken } from '../../lib/jwtUtils'

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
// API: Implement resolver register using createOne from UserTC

export const login = schemaComposer.createResolver({
  name : "Login",
  type: LoginPayloadOTC,
  args: {
    username : "String!",
    password: "String!"
  },
  resolve : async ({args}) => {
    const {username , password} = args
    const user = UserModel.findOne({ username : usernam.toLowerCase()})
    if (!user){
      return{
        message: "Username"+ username + "not found",
        token: null
      }

    }
    const validPassword = await user.verifyPassword(password)
    if (!validPassword) {
      return{
        message: "Incorrect password",
        token: null
      }
    }
    const token = generateToken(user,process.env.JWT_SECRET)

    if(token){
      return {
        message: "Server error",
        token: null
      }
    }
    return{
      message: "Login success",
        token: token
    }

  }
})
