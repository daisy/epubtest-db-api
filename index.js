const path = require('path');
const envFile = process.argv.length > 2 ? 
    process.argv[2] : ".env";
const envpath = path.resolve(__dirname, envFile);
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config({path: envpath});
}

const express = require('express')
const { postgraphile } = require("postgraphile");
const { options } = require('./postgraphileOptions');
const schemas = ['epubtest'];

const app = express();
const DBURL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DATABASE_HOST}:5432/${process.env.POSTGRES_DB}`;

app.use(
    postgraphile(
        DBURL, 
        schemas, 
        {
            ...options,
            readCache: `${__dirname}/postgraphile.cache`,
        }
    )
);

app.use(express.static('public'));
app.post("/post-test", (req, res) => {
    res.send('can post');
});

const port = process.env.GRAPHQL_PORT || 3000;
app.listen(port, () => console.log(`GraphQL endpoint listening on port ${port}!`))
