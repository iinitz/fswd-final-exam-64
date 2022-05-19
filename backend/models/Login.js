const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
const LoginSchema = new mongoose.Schema({
    username:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    token:{
        type: String
    },
    id:{
        type: ObjectId
    }
})

const Login = mongoose.model("Login", LoginSchema, "fswd-final")
module.exports = Login