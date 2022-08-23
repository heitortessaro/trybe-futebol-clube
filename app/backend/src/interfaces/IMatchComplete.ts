import IMatch from './IMatch';
import { ITeam } from './ITeam';

export interface IMatchComplete extends IMatch {
  teamHome: ITeam,
  teamAway: ITeam,
}
