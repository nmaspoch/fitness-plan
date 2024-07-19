const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Plan = sequelize.define('plan', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  weeks: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Plan;

