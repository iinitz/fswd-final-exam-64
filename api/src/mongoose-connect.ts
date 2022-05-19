import mongoose from 'mongoose'

const uri = process.env.MONGO_HOST ?? ''
const options = {
  dbName: process.env.MONGO_DB,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
}
//mongodb+srv://@cluster1.tbssg.mongodb.net
export default mongoose.connect(uri, options)
