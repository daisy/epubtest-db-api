const { createPostGraphileSchema } = require('postgraphile');
const { options } = require('./postgraphileOptions');
const { Pool } = require('pg');

const DBURL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DATABASE_HOST}:5432/${process.env.POSTGRES_DB}`;

const schemas = process.env.DATABASE_SCHEMAS
  ? process.env.DATABASE_SCHEMAS.split(',')
  : ['app_public'];

async function main() {
  const pgPool = new Pool({
    connectionString: DBURL,
  });
  await createPostGraphileSchema(pgPool, schemas, {
    ...options,
    writeCache: `${__dirname}/postgraphile.cache`,
  });
  await pgPool.end();
}

main().then(null, e => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});