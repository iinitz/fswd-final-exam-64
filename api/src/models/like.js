import { model, Schema } from 'mongoose'

import { ILike } from '../types/models'

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

// API: Implement LikeTC here

