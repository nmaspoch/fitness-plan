const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Session = sequelize.define("sessions", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  week: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  session: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Session;
