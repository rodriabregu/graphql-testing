import { gql, ApolloServer } from 'apollo-server';

const persons = [
    {
        name: "Rodri",
        phone: "1234",
        stree: "frontera1",
    },
    {
        name: "Rodrigo",
        phone: "12345",
        stree: "frontera2",
    },
    {
        name: "Rodrigaso",
        phone: "123456",
        stree: "frontera3",
    }
]

const typeDefinition = gql`
    type Person {
        name: String!
        phone: String
        street: String!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(namE: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinition,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server at ${url}`)
})