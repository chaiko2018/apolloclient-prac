const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    id: String!
    title: String!
    author: String
    created: String
  }
  type Dog {
    id: String!
    breed: String
  }
  type Query {
    books: [Book]
    dogs: [Dog]
  }
`;

const books = [
  {
    id: "100001",
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    created: "2020/05/05",
  },
  {
    id: "100002",
    title: "Jurassic Park",
    author: "Michael Crichton",
    created: "2020/06/01",
  },
  {
    id: "100003",
    title: "Tommy Trip",
    author: "John Swith",
    created: "2020/10/31",
  },
];

const dogs = [
  {
    id: "test",
    breed: "testBreed",
  },
  {
    id: "test2",
    breed: "testBreed2",
  },
  {
    id: "test3",
    breed: "testBreed3",
  },
];

const resolvers = {
  Query: {
    books: () => {
      return books;
    },
    dogs: () => {
      return dogs;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
