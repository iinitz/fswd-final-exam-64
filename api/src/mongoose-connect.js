import mongoose from 'mongoose'

const uri = process.env.MONGO_HOST ?? ''
const options = {
  dbName: process.env.MONGO_DB,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
}

// const uri = 'mongodb+srv://cluster0.kpzcy.mongodb.net' // mongodb://localhost:27017
// const options = {
//   dbName: 'fswd-final',
//   user: 'aomsk',
//   pass: '12345',
// }

export default mongoose.connect(uri, options)
