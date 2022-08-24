import { IMatchComplete } from '../../interfaces/IMatchComplete';
import { ILeaderboard } from '../../interfaces/ILeaderboard';
import { ITeam } from '../../interfaces/ITeam';
import { ILeaderboardDTS } from './dataTreatement.service';

export interface ILeaderboardService {
  LeaderboardHome(matches:IMatchComplete[], teams:ITeam[]): ILeaderboard[],
  LeaderboardAway(): Promise<ILeaderboard[]>,
  Leaderboard(matches:IMatchComplete[], teams:ITeam[]): ILeaderboard[]
}

export default class LeaderboardService implements ILeaderboardService {
  constructor(private dataTreatmentService: ILeaderboardDTS) {}

  private createLeaderboard = (teams:ITeam[]): ILeaderboard[] => {
    const leaderboard:ILeaderboard[] = teams.map((team) => (
      {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: '0',
      } as ILeaderboard));
    return leaderboard;
  };

  LeaderboardHome = (matches:IMatchComplete[], teams:ITeam[]): ILeaderboard[] => {
    const leaderboard = this.createLeaderboard(teams);
    // leaderboard = this.dataTreatmentService.checkDrawn(matches, leaderboard);
    return leaderboard;
  };

  LeaderboardAway = (): Promise<ILeaderboard[]> => {
    throw new Error('Method not implemented.');
  };

  Leaderboard = (matches:IMatchComplete[], teams:ITeam[]): ILeaderboard[] => {
    let leaderboard = this.createLeaderboard(teams);
    leaderboard = this.dataTreatmentService.checkDrawn(matches, leaderboard);
    leaderboard = this.dataTreatmentService.checkVictories(matches, leaderboard);
    leaderboard = this.dataTreatmentService.countGoals(matches, leaderboard);
    leaderboard = this.dataTreatmentService.calcGoalBalance(leaderboard);
    leaderboard = this.dataTreatmentService.calcTotalGames(leaderboard);
    leaderboard = this.dataTreatmentService.calcTotalPoints(leaderboard);
    leaderboard = this.dataTreatmentService.calcEfficiency(leaderboard);
    leaderboard = this.dataTreatmentService.sortClassification(leaderboard);
    return leaderboard;
  };
}
