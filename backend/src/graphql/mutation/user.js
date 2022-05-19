import { schemaComposer } from "graphql-compose"
import { UserModel, UserTC } from "../../models/user"
import { generateUserToken } from "../../lib/generateUserToken"

export const createUser = UserTC.getResolver("createOne")
export const updateUser = UserTC.getResolver("updateById")
const ChangePasswordPayLoadOTC = schemaComposer.createObjectTC({
  name: "ChangePasswordPayLoadOTC",
  fields: {
    status: "String!",
    message: "String",
  },
})
export const changePassword = schemaComposer.createResolver({
  name: "changePassword",
  kind: "mutation",
  type: ChangePasswordPayLoadOTC,
  args: {
    oldPassword: "String!",
    newPassword: "String!",
  },
  resolve: async ({ context, args }) => {
    const { userId: _id } = context
    if (!_id) {
      return { status: "error", message: "Unauthorized" }
    }
    const user = await UserModel.findById(_id)
    if (!user) {
      return { status: "error", message: "User not found" }
    }

    if (!(await user.verifyPassword(args.oldPassword))) {
      return { status: "error", message: "Incorrect password" }
    }
    user.password = args.newPassword
    user.save()
    return { status: "success", message: "Password changed successfully" }
  },
})

const LoginPayloadOTC = schemaComposer.createObjectTC({
  name: "LoginPayloadOTC",
  fields: {
    status: "String!",
    message: "String",
    token: "String",
  },
})
export const login = schemaComposer.createResolver({
  name: "login",
  kind: "mutation",
  type: LoginPayloadOTC,
  args: {
    email: "String!",
    password: "String!",
  },
  resolve: async ({ args }) => {
    const { email, password } = args
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      return {
        status: "failed",
        message: "Email not found",
        token: null,
      }
    }
    const validPassword = await user.verifyPassword(password)
    if (!validPassword) {
      return {
        status: "failed",
        message: "Invalid password",
        token: null,
      }
    }
    const token = generateUserToken(user)
    return {
      status: "success",
      message: "Login success",
      token,
    }
  },
})
