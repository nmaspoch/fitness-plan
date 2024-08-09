const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Plan = sequelize.define('plan', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  numWorkouts: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}
);

module.exports = Plan;