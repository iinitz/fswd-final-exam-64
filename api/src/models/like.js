import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'



const LikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tweetId: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
)

export const LikeModel = model('Like', LikeSchema)
export const LikeTC = composeWithMongoose(LikeModel)

// API: Implement LikeTC here
