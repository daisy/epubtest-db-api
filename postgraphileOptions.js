const path = require('path');

const envpath = path.join(__dirname, '/.env');
require('dotenv').config({path: envpath});

const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");
const PgFilterPlugin = require("postgraphile-plugin-connection-filter");
const PgOrderByPlugin = require("@graphile-contrib/pg-order-by-related");
exports.options = {
  dynamicJson: true,
  cors: true,
  graphiql: false,
  graphqlRoute: '/graphql',
  externalUrlBase: ``,
  pgDefaultRole: process.env.POSTGRES_DEFAULT_ROLE || 'epubtest_public_role',
  // If consuming JWT:
  jwtSecret: process.env.JWT_SECRET,
  // If generating JWT:
  jwtPgTypeIdentifier: process.env.JWT_PG_TYPE_IDENTIFIER || 'epubtest.jwt_token',
  ignoreRBAC: false,
  appendPlugins: [PgSimplifyInflectorPlugin, PgFilterPlugin, PgOrderByPlugin]
};
