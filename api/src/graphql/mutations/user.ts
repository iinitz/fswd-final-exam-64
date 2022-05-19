import {ResolverResolveParams, schemaComposer } from 'graphql-compose'

import { generateToken } from '../../lib/jwtUtils'
import { UserModel, UserTC } from '../../models/user'
import { IApolloContext } from '../../types'
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
interface ILoginArgs{
  username:string,
  password:string
}
interface IRegisterArgs{
  username:string,
  password:string,
  fullname:string,
}
export const register = schemaComposer.createResolver({
  name: 'register',
  type: UserTC.getType(),
  args: {
    fullname: 'String!',
    username: 'String!',
    password: 'String!',
  },
  resolve: async ({ args } : ResolverResolveParams<IRegisterArgs, IApolloContext> ) => {
    const { username, password, fullname} = args
    return await UserModel.create({ username, password, fullname})
  }
})

export const login = schemaComposer.createResolver({
  name: 'login',
  type: LoginPayloadOTC,
  args: {
    username: 'String!',
    password: 'String!',
  },
  resolve: async ({ args } : ResolverResolveParams<ILoginArgs, IApolloContext>) => {
    const { username, password } = args
    const existUser = await UserModel.findOne({ username: username.toLowerCase() })

    if (!existUser) {
      return {
        message: `Username ${username} not found`
      }
    }
    if (! await existUser.verifyPassword(password)) {
      return {
        message: 'Incorrect password'
      }
    }
    const token = generateToken({ _id: existUser._id }, process.env.JWT_SECRET ?? 'secret')
    return {
      message: 'Login success',
      token,
    }
  },
})
