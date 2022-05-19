const typeDefs = `
    type Query{
        data : [Register]
        login : [login]
    }

    type Register{
        fullname : String!,
        username : String!,
        password : String!,
        token: String!
    }
    type login{
        username : String!,
        password : String!,
        token: String!,
        id: ID!
    }
    type Mutation{
        register(fullname: String!, username: String!, password: String): Register,
        login(username: String!, password: String!): login
    }
`
module.exports = typeDefs;