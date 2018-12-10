const express = require('express');
const expressGraphQL = require('express-graphql');
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');

const graphql = args => args[0];

const schema = buildSchema(graphql`
    type Query {
        allCustomers(last: Int): [Customer!]!
    }

    type Mutation {
        createCustomer(name: String!, age: Int!, email: String!): Customer!
        updateCustomer(id: ID!, name: String!, age: Int!, email: String!): Customer!
        deleteCustomer(id: ID!): Customer!
    }

    type Customer {
        id: ID!
        name: String!
        email: String!
        age: Int!
    }
`);

const resolvers = {
    allCustomers: args => fetch('http://localhost:3000/customers').then(res => res.json()),

    createCustomer: args => fetch(`http://localhost:3000/customers/`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(args)
    }).then(res => res.json()),

    updateCustomer: args => fetch(`http://localhost:3000/customers/${args.id}`, {
        method: 'update',
        body: JSON.stringify(args)
    }).then(res => res.json()),

    deleteCustomer: args => fetch(`http://localhost:3000/customers/${args.id}`, {
        method: 'delete',
    }).then(res => res.json()),
}

const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(4000, () => console.log('Server is running on port 4000..'));