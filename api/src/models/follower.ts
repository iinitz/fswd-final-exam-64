import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const FollowerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    followedId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
)

export const FollowerModel = model('Follower', FollowerSchema)
// API: Implement FollowerTC here
export const FollowerTC = composeMongoose(FollowerModel)
