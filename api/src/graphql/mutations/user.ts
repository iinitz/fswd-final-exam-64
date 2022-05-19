import { schemaComposer } from 'graphql-compose'
import { UserModel } from '../../models/user';

const LoginPayloadOTC = schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    message: 'String!',
    token: 'String',
  },
})

export cost login = schemaComposer.createResolver({
  name: "login",
  kind: "mutation",
  type: LoginPayloadOTC,
  args: {
    username: "String!",
    password: "String!",
  },
  resolve: async ({ args }) => {
    const { username, password } = args;
    const user = await UserModel.findOne({username: username, password: password})
  
    if(!user){
      return{
        message: "user not found"
      }
    }

    if(user.verifyPassword(password)){
      return{
        message: "incorrect password"
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
