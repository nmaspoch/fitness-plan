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
  },
  sets: {
    type: Sequelize.INTEGER,
  },
  reps: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  }
});

module.exports = Exercise;
