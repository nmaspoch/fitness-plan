module.exports = class Plan {
  constructor(sessions) {
    this.numSessions = sessions.length;
    this.sessions = [];

    for (let i = 0; i < sessions.length; i++) {
      const exercises = [];

      for (let j = 0; j < sessions[i].exercises.length; j++) {
        exercises.push(sessions[i].exercises[j].name);
      }

      this.sessions.push(
        `Week: ${sessions[i].week} Session: ${sessions[i].session} Exercises: ${exercises}`
      );
    }
  }

  getSessions() {
    for (let i = 0; i < this.sessions.length; i++) {
      console.log(this.sessions[i]);
    }
  }
};

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Plan = sequelize.define('plan', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   weight: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   age: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   height: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   goals: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// module.exports = Plan;

