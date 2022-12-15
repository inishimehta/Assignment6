const Sequelize = require('sequelize');

//setup db connection
var sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true },
    logging: false
});

//authenticate connection
sequelize.authenticate().then(()=> console.log('PostgreSQL connected.'))
.catch((err)=>console.log("Unable to connect to DB.", err));

module.exports = {sequelize, Sequelize};
