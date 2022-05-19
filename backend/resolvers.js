const Regis =  require("./models/Regis")
const Login = require("./models/Login")
const {generateToken} = require("./utils/genToken")
const resolvers = {
    Mutation:{
        register: async(parent, args, ctx, info)=>{
            const {fullname, username, password} = args
            const regis = new Regis({
                fullname: fullname,
                username: username,
                password: password,
                token : generateToken()
            })
            await regis.save()
            return regis;
        },
        login: async(parent, args, ctx, info)=>{
            const {username, password} = args;
            const login = await Login.findOne({username:username, password:password})
            return login
        }
    }
}
module.exports = resolvers