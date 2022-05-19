import { composeWithMongoose } from "graphql-compose-mongoose"
import { model, Schema } from "mongoose"
import mongooseBcrypt from "mongoose-bcrypt"

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
  },
  {
    timestamps: true,
  }
)
UserSchema.plugin(mongooseBcrypt)
export const UserModel = model("User", UserSchema)

export const UserTC = composeWithMongoose(UserModel)
