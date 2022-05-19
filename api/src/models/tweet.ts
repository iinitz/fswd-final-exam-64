import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

import { ITweet } from '../types/models'

const TweetSchema = new Schema<ITweet>(
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

export const TweetModel = model<ITweet>('Tweet', TweetSchema)
export const TweetTC = composeWithMongoose(TweetModel)
// API: Implement TweetTC here
