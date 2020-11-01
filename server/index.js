const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const resolvers = {
  Query,
  Mutation,
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./server/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(() => console.log("Server running on localhost:4000"));
