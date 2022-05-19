import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

import { IFollower } from '../types/models'

const FollowerSchema = new Schema<IFollower>(
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

export const FollowerModel = model<IFollower>('Follower', FollowerSchema)

export const FollowerTC = composeMongoose(FollowerModel)

// API: Implement FollowerTC here
