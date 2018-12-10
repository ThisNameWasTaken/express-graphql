const express = require('express');
const expressGraphQL = require('express-graphql');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');

const graphql = args => args[0];

const schema = buildSchema(readFileSync('./schema.gql', 'utf8'));

const resolvers = require('./resolvers');

const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(4000, () => console.log('Server is running on port 4000..'));