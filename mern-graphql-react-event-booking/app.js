
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);


app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

  




 mongoose
   .connect(
    "mongodb+srv://sharonrose:$cN+at8WnF+n2UN@testcluster1.jy5sx.mongodb.net/sample_mflix?retryWrites=true&w=majority"
   )

   .then(() => {
     console.log("Successfully connected to MongoDB");
     app.listen(8000, () => {
       console.log("Server is running on port 8000");
     });
   })
   .catch((err) => {
     console.error("Connection error:", err);
   });

app.get('/', (req, res, next) =>{
  res.send('Welcome to learning GraphQl.');
});



















