const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Connect to SQL Server
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.jugador = require("./jugador.model.js")(sequelize, Sequelize);
db.attempt = require("./attempt.model.js")(sequelize, Sequelize);

module.exports = db;