const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
    books: [Book]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookInput: BookInput!): User
    deleteBook(bookId: String!): User
  }

  input BookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
`;

module.exports = typeDefs;