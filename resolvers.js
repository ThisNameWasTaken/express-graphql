const fetch = require('node-fetch');

module.exports = {
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