const sql = require('mssql');
const { db } = require('../config');

const config = {
  server: db.server,
  user: db.user,
  password: db.password,
  database: db.database,
  options: {
    encrypt: false,               
    trustServerCertificate: true, 
    ...(db.instanceName ? { instanceName: db.instanceName } : {}),
  },
 
  ...(db.instanceName ? {} : { port: db.port }),
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
};

let poolPromise;

function getPool() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .catch((error) => {
        poolPromise = undefined;
        throw error;
      });
  }
  return poolPromise;
}

async function query(text, params = {}) {
  const pool = await getPool();
  const request = pool.request();
  Object.entries(params).forEach(([name, value]) => request.input(name, value));
  return request.query(text);
}

module.exports = { query, getPool, sql };
