import { ForbiddenError } from 'apollo-server-core'
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'

import { schemaComposer } from 'graphql-compose'
import { composeMongoose } from 'graphql-compose-mongoose';
import { generateToken } from '../../lib/jwtUtils';
import { UserModel,UserTC } from '../../models/user';
import { IUser } from '../../types/models';
import { IApolloContext } from '../../types';


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
const loginPayloadOTC = schemaComposer.createObjectTC({
  name: "loginPayload",
  fields: {
    status: "String!",
    message: "String",
    token: "String",
  },
});
export const login = schemaComposer.createResolver({
  name: "login",
  kind: "mutation",
  type: loginPayloadOTC,
  args: {
    username: "String!",
    password: "String",
  },
  resolve: async ({ args }) => {
    const { username, password } = args;
    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (!user) {
      // throw new UserInputError('Username not found')
      return {
        status: "failed",
        message: `Username ${username} not found`,
        token: null,
      };
    }
    const validPassword = user.verifyPassword;
    if (!validPassword) {
      // throw new AuthenticationError('Password incorrect')
      return {
        status: "failed",
        message: "Incorrect password",
        token: null,
      };
    }
    const token = generateToken({ _id: user._id }, process.env.JWT_SECRET ?? "" );
    return {
      message: "Login success",
      token,
    };
  },
});
// API: Implement resolver register using createOne from UserTC
export const user = UserTC.mongooseResolvers.createOne({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next: ResolverRpCb<ITweet, IApolloContext>) => (rp: ResolverResolveParams<ITweet, IApolloContext>) => {
  if (!rp.context.user) {
    throw new ForbiddenError('Unauthorized')
  }
  const customRp: Partial<ResolverResolveParams<IUser, IApolloContext>> = {
    args: {
      record: {
        userId: rp.context.user?._id,
      },
    },
  }
  const newRp = mergeDeepRight(rp, customRp) as ResolverResolveParams<IUser, IApolloContext>
  return next(newRp) as Promise<IUser>
})