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

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'matchesHomeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'matchesAwayTeam' });

// Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
// Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

// Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'matchesHomeTeam' });
// Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'matchesAwayTeam' });

// a definição pelos dois modos garante que possam ser buscados pelos anbos os "Lados"
// já o alyias serve para o JS identificar o campo.

// Teams.hasMany(Matches, {
//   sourceKey: 'id',
//   foreignKey: 'homeTeam',
//   as: 'homeTeam',
// });

// Teams.hasMany(Matches, {
//   sourceKey: 'id',
//   foreignKey: 'awayTeam',
//   as: 'awayTeam',
// });

export default Matches;
