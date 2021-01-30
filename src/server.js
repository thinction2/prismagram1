import "./env";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticatedJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT || 4000;

export const prisma = new PrismaClient();
const pubsub = new PubSub();

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated, pubsub }),
});

server.express.use(logger("dev"));
server.express.use(authenticatedJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost: ${PORT}`)
);
