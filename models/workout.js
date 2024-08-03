const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Workout = sequelize.define("workout", {
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
  workout: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Workout;
