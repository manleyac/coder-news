const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const path = require("path");
require("dotenv").config();

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const options = {
  port: process.env.PORT || 4000,
  playground: false,
  endpoint: "/graphql",
};

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



//serve client static assets
server.express.use(express.static(path.join(__dirname, '../client/build')));
server.express.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});


server.start(options, ({ port }) =>
  console.log(`Server running on port: ${port}`)
);
