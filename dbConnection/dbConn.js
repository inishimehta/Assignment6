const Sequelize = require("sequelize");

//setup db connection
var sequelize = new Sequelize(
  process.env.DB,
  "sftsgxgn",
  "wxhrCdzRP-HC0rCWp4QusGzy0MMCz6ki",
  {
    host: "mouse.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
    ssl: true,
    dialectOptions: {
      ssl: { require: true },
    },
    query: { raw: true },
    logging: false,
  }
);

//authenticate connection
sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL connected."))
  .catch((err) => console.log("Unable to connect to DB.", err));

module.exports = { sequelize, Sequelize };
