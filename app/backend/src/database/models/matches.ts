import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';

import Teams from './teams';

class Matches extends Model {
  id!: number;
  homeTeam!: string;
  homeTeamGoals!: number;
  awayTeam!: string;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

// Matches.belongsTo(Teams, { foreignKey: 'homeTeam' });
// Matches.belongsTo(Teams, { foreignKey: 'awayTeam' });

// Teams.hasMany(Matches, { foreignKey: 'homeTeam' });
// Teams.hasMany(Matches, { foreignKey: 'awayTeam' });

Teams.hasMany(Matches, {
  sourceKey: 'id',
  foreignKey: 'homeTeam',
  as: 'homeTeam',
});
Teams.hasMany(Matches, {
  sourceKey: 'id',
  foreignKey: 'awayTeam',
  as: 'awayTeam',
});

export default Matches;
