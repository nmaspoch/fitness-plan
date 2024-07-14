const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Profile = sequelize.define('profile', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  height: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  goals: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Profile;
