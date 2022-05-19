import { schemaComposer, ResolverResolveParams } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'

import { verifyPassword } from '../../lib/passwordUtils'
import { UserTC, UserModel } from '../../models/user'
import { IApolloContext } from '../../types'
import { ILoginArgs } from '../../types/graphql'
import { IUser } from '../../types/models'


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

export const login = UserTC.schemaComposer.createResolver({
  name: 'login',
  kind: 'mutation',
  args: {
    username: 'String',
    password: 'String',
  },
  resolve: async ({ args }) => {
    const username = args.username as string
    const password = args.password as string

    const user = await UserModel?.findOne({ username: username.toLowerCase() }) as IUser
    if (!user) {
      throw new Error(`Username ${username} not found`)
    }
    // const validPassword = await verifyPassword(user, password)
    // if (!validPassword) {
    //   throw new Error(`Incorrect password`)
    // }
  },
})

// export const login = UserTC.mongooseResolvers.createOne().wrapResolve((next) => async (rp) => {
//   const username = rp.args?.record.username as string
//   const target = await UserModel.findOne({ username })

//   // const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<ILoginArgs, IApolloContext>

//   if (!target) {
//     return next(rp) as Promise<ILoginArgs>
//   }
// })

// API: Implement resolver register using createOne from UserTC

export const register = UserTC.mongooseResolvers.createOne({ record: { requiredFields: ['username', 'password'] } }).wrapResolve((next) => async (rp) => {
  const username = rp.args?.record.username as string
  const target = await UserModel.findOne({ username })
  const customRp: Partial<ResolverResolveParams<ILoginArgs, IApolloContext>> = {
    args: {
      filter: {
        username: {
          $ne: target,
        },
      },
    },
  }
  const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<ILoginArgs, IApolloContext>
  return next(newRp) as Promise<ILoginArgs>
})
