import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});

export const getConn = async () => {
  return pool.getConnection();
}
