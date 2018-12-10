const fetch = require('node-fetch');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parentValue, args) =>
                fetch(`http://localhost:3000/customers/${args.id}`)
                    .then(res => res.json())
        },
        customers: {
            type: GraphQLList(CustomerType),
            resolve: () =>
                fetch(`http://localhost:3000/customers`)
                    .then(res => res.json())

        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parentValue, args) => fetch(`http://localhost:3000/customers/`, {
                method: 'POST',
                body: JSON.stringify(args)
            }).then(res => res.json())
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});