import mongoose from 'mongoose'

const uri = process.env.MONGO_HOST ?? ''


export default mongoose.connect(uri)
