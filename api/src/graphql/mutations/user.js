"use strict";
exports.__esModule = true;
var graphql_compose_1 = require("graphql-compose");
var LoginPayloadOTC = graphql_compose_1.schemaComposer.createObjectTC({
    name: 'LoginPayload',
    fields: {
        message: 'String!',
        token: 'String'
    }
});
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
