import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan'
import { resolvers } from './schema/resolvers.js'
import { typeDefs } from './schema/typeDefs.js';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv"
import { GraphQLError } from 'graphql';
dotenv.config()

const prisma = new PrismaClient();
const secret = process.env.JWT_TOKEN

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
await server.start();
app.use(
  '/graphql',
  express.json(),
  cors<cors.CorsRequest>(),
  morgan('dev'),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return {req}
      }

      try {
        const decodedToken = jwt.verify(token, secret) as JwtPayload ;
        const user = await prisma.user.findUnique({ where: { email: decodedToken.userEmail } });
      
      if (!user) {
        return {req}
      }
      
      (req as any).user = user;
      return {req};
      } catch (error) {
        throw new GraphQLError("Invalid token", {
          extensions: {
            code: 'unauthenticated',
            http: { status: 401}
          }
        })
      }
    },
  }),
);

await new Promise<void>((resolve) => httpServer.listen(process.env.PORT || { port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);