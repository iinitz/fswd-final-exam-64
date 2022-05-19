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

// API: Implement FollowerTC here
const FollowerTC = new Schema<IFollower>(
  {
    userId:{
      type: Schema.Types.ObjectId,
      ref: 'User' ,
      required: true,
      index: true,
    },
    followedId:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    }
  }

)
export const FollowerTc = model<IFollower>('Follower', FollowerTC)
