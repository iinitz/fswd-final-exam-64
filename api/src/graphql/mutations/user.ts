import { schemaComposer } from 'graphql-compose'
import { resolve } from 'path'
import { UserModel } from '../../models/user';
import { generateToken } from '../../lib/jwtUtils';
import { JwtPayload, sign, verify } from 'jsonwebtoken'

const LoginPayloadOTC = schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    message: 'String!',
    token: 'String',
  },
})

const checkPassword = (userPassword: String,password: String) => {
  if(userPassword == password){
    return true
  }
  else{
    return false
  }
}

export const login = schemaComposer.createResolver({
  name: 'login',
  kind: "mutation",
  type: LoginPayloadOTC,
  args:{
    username:"String!",
    password:"String",
  }
  resolve: async ({args}) =>{
    const {username,password} = args;
    const user = await
    UserModel.findOne({username:username.toLowerCase()})
    if(!user){
      return{
        status:"failed",
        message:`Username ${username}  not found`,
        token:null,
      }
    }
    const validPassword = checkPassword(user.password,password)
    if(!validPassword){
      return{
        status:"failed",
        message:"Password Incorrect",
        token:null,
      }
    }
    const token = generateToken
    return{
      status:"success",
      message:"Login success",
      token:token,
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
