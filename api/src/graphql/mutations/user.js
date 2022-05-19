import { schemaComposer } from 'graphql-compose'
import { UserModel, UserTC } from '../../models/user';

import { generateToken } from '../../lib/jwtUtils';
// import { verifyPassword } from '../../lib/passwordUtils';

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

export const login = schemaComposer.createResolver({
  name: "login",
  kind: "mutation",
  type: LoginPayloadOTC,
  args: {
    username: "String!",
    password: "String!",
  },
  resolve: async ({ args }) => {
    const { username, password } = args;
    const user = await UserModel.findOne({ username: username.toLowerCase() });
    
    if (!user) {
      return {
        message: `Username ${username} not found`,
        token: null
      };
    }

    if (!user.verifyPassword(password)) {
      return {
        message: "Incorrect password",
        token: null
      }
    }

    const auth = "12asd54sa"
    // auth = generateToken({
    //   payload: { _id: user._id },
    //   secret: process.env.JWT_SECRET
    // })

    return {
      message: "Login success",
      token: auth
    };
  },
});

// API: Implement resolver register using createOne from UserTC
export const register = UserTC.mongooseResolvers.createOne();