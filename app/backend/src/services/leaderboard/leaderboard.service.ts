import { IMatchComplete } from '../../interfaces/IMatchComplete';
import { ILeaderboard } from '../../interfaces/ILeaderboard';
import { ITeam } from '../../interfaces/ITeam';
import { ILeaderboardDTS } from './dataTreatement.service';

export interface ILeaderboardService {
  LeaderboardHome(matches:IMatchComplete[], teams:ITeam[]): ILeaderboard[],
  LeaderboardAway(matches:IMatchComplete[], teams:ITeam[]): ILeaderboard[],
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

  private runSecundaryOperations = (
    matches:IMatchComplete[],
    leadeboard:ILeaderboard[],
  ):ILeaderboard[] => {
    let newLeaderboard = leadeboard;
    newLeaderboard = this.dataTreatmentService.calcGoalBalance(newLeaderboard);
    newLeaderboard = this.dataTreatmentService.calcTotalGames(newLeaderboard);
    newLeaderboard = this.dataTreatmentService.calcTotalPoints(newLeaderboard);
    newLeaderboard = this.dataTreatmentService.calcEfficiency(newLeaderboard);
    newLeaderboard = this.dataTreatmentService.sortClassification(newLeaderboard);
    return newLeaderboard;
  };

  LeaderboardHome = (matches:IMatchComplete[], teams:ITeam[]): ILeaderboard[] => {
    let leaderboard = this.createLeaderboard(teams);
    leaderboard = this.dataTreatmentService.checkDrawn(matches, leaderboard, false, true);
    leaderboard = this.dataTreatmentService.checkVictories(matches, leaderboard, false, true);
    leaderboard = this.dataTreatmentService.countGoals(matches, leaderboard, false, true);
    leaderboard = this.runSecundaryOperations(matches, leaderboard);
    return leaderboard;
  };

  LeaderboardAway = (matches:IMatchComplete[], teams:ITeam[]): ILeaderboard[] => {
    let leaderboard = this.createLeaderboard(teams);
    leaderboard = this.dataTreatmentService.checkDrawn(matches, leaderboard, true, false);
    leaderboard = this.dataTreatmentService.checkVictories(matches, leaderboard, true, false);
    leaderboard = this.dataTreatmentService.countGoals(matches, leaderboard, true, false);
    leaderboard = this.runSecundaryOperations(matches, leaderboard);
    return leaderboard;
  };

  Leaderboard = (matches:IMatchComplete[], teams:ITeam[]): ILeaderboard[] => {
    let leaderboard = this.createLeaderboard(teams);
    leaderboard = this.dataTreatmentService.checkDrawn(matches, leaderboard, true, true);
    leaderboard = this.dataTreatmentService.checkVictories(matches, leaderboard, true, true);
    leaderboard = this.dataTreatmentService.countGoals(matches, leaderboard, true, true);
    leaderboard = this.runSecundaryOperations(matches, leaderboard);
    return leaderboard;
  };
}
