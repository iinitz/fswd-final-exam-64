const mongoose = require("mongoose")
const RegisSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required : true
    },
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
    }
})

const Regis = mongoose.model("Regis", RegisSchema, "fswd-final")
module.exports = Regis