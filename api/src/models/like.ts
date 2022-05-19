import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

import { ILike } from '../types/models'

const LikeSchema = new Schema<ILike>(
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

export const LikeModel = model<ILike>('Like', LikeSchema)

// API: Implement LikeTC here
export const LikeTC = composeWithMongoose(LikeModel)