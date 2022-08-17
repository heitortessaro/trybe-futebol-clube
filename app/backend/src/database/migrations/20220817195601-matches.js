'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeam: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'teams',
          key:'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'home_team',
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        // allowNull: false, 
        field: 'home_team_goals',
        defaultValue: 0,
      },
      awayTeam: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'teams',
          key:'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'away_team',
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        // allowNull: false, 
        field: 'home_team_goals',
        defaultValue: 0,
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        // allowNull: false,
        defaultValue: false,
        field: 'in_progress',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
