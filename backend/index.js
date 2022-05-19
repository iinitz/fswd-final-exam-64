const express = require("express")
const path = require("path")
const { graphqlExpress, ApolloServer } = require('apollo-server-express')
const app = express()
const typeDefs = require("./typeDefs")
const resolvers = require("./resolvers")
const mongoose = require("mongoose")


const server = new ApolloServer({ typeDefs, resolvers });
const fun = async ()=>{
    await server.start()
    server.applyMiddleware({ app });
    await mongoose.connect("mongodb+srv://Rping:rping555@cluster0.8brfw.mongodb.net/fswd-final")
    console.log("mongoose connect")
    app.listen(4000, ()=>{
        console.log("Start at port 4000")
    })
}
fun()