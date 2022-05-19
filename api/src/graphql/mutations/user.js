import { schemaComposer } from 'graphql-compose'
import { UserModel } from '../../models/user';

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
  name: "login",
  args: {
    username: "String!",
    password: "String!",
  },
  type: LoginPayload,
  resolve: async ({ args }) => {
    let message = "Login success"
    const { username, password } = args;
try{
    const user = await UserModel.findOne({ username });
    if (!user) {
      message = Username ${username} not found
    }
    const valid = await user.verifyPassword(password);
    if (!valid) {
      message = "Incorrect password"
    }
    const token = jsonwebtoken.sign(
        { _id: user._id },
        process.env.JWT_SECRET
      ),
    return {
      message,
    token,
    };
}catch(err){
return {
  message:"Server error",
    token:null,
}
}
  },
});

