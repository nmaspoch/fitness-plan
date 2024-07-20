const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Exercise = sequelize.define("exercise", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sets: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reps: {
    type: Sequelize.STRING,
  },
});

module.exports = Exercise;
