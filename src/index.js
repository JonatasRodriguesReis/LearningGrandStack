import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {merge} from 'lodash'
import {item} from './schemas/item'
import {ItemResolver} from './resolvers/ItemResolver'  
import neo4j from 'neo4j-driver'

const Query = `
    type Query {
        _empty: String
    }
`;

const Mutation = `type Mutation`;

const server = new ApolloServer(
    {
        typeDefs:  [Query,Mutation,item],
        resolvers: ItemResolver /* merge(resolvers, authorResolvers, bookResolvers), */
    }
);

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);