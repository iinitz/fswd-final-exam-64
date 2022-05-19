import mongoose from 'mongoose'

const uri = 'mongodb+srv://OverEarth:x43L85%409r-Z9cRx@cluster0.lk02s.mongodb.net/test'
const options = {
  dbName: 'fswd-final',
  user: 'OverEarth',
  pass: 'x43L85%409r-Z9cRx',
}

export default mongoose.connect(uri, options)
