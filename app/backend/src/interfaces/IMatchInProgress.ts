import IMatchScore from './IMatchScore';

export default interface IMatchInProgress extends IMatchScore {
  homeTeam: number;
  awayTeam: number;
}
