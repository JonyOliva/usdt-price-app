const config = {
  host: "192.168.0.15", 
  port: 3306,
  user: "root", 
  password: "root",
  database: "P2P"
};

const knex = require('knex')({
  client: 'mysql',
  connection: config
});

module.exports = knex;