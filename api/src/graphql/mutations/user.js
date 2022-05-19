import { schemaComposer } from 'graphql-compose'
import { type } from 'os'
import { UserTC } from '../../models/user'

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
export const create = UserTC.addResolver({
  name: 'createOne',
  args: {
    username : String,
    password : String,
    fullname : String,
  },
  type: UserTC,
  resolve: async({ source, args }) => {
    
  },
})

/* export const creatUser = UserTC.getResolver('createOne') */