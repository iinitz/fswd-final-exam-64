import { composeMongoose, composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'


const TweetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    text: {
      type: String,
      trim: true,
      default: '',
    },
    retweetId: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
      default: null,
      index: true,
    },
  },
  { timestamps: true },
)

export const TweetModel = model('Tweet', TweetSchema)

// API: Implement TweetTC here
export const TweetTC = composeMongoose(TweetModel)
