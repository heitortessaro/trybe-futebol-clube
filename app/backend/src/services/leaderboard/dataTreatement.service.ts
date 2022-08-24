import { IMatchComplete } from '../../interfaces/IMatchComplete';
import { ILeaderboard } from '../../interfaces/ILeaderboard';

export interface ILeaderboardDTS {
  checkDrawn(matches:IMatchComplete[], leadeboard:ILeaderboard[]):ILeaderboard[],
  checkVictories(matches:IMatchComplete[], leadeboard:ILeaderboard[]):ILeaderboard[],
  countGoals(matches:IMatchComplete[], leadeboard:ILeaderboard[]):ILeaderboard[],
  calcGoalBalance(leaderboard:ILeaderboard[]): ILeaderboard[],
  calcEfficiency(leaderboard:ILeaderboard[]): ILeaderboard[],
  calcTotalGames(leaderboard:ILeaderboard[]): ILeaderboard[],
  calcTotalPoints(leaderboard:ILeaderboard[]): ILeaderboard[],
  sortClassification(leaderboard:ILeaderboard[]): ILeaderboard[],
}

export default class LeaderboardDTService implements ILeaderboardDTS {
  private processVictory = (leadeboard: ILeaderboard[], teamName: string):ILeaderboard[] => {
    const newLeaderboard = leadeboard;
    const teamIndex = leadeboard.findIndex((team) => team.name === teamName);
    newLeaderboard[teamIndex].totalVictories += 1;
    return newLeaderboard;
  };

  private processDraw = (leadeboard: ILeaderboard[], teamName: string):ILeaderboard[] => {
    const newLeaderboard = leadeboard;
    const teamIndex = leadeboard.findIndex((team) => team.name === teamName);
    newLeaderboard[teamIndex].totalDraws += 1;
    return newLeaderboard;
  };

  private processGoals = (
    leadeboard: ILeaderboard[],
    teamName: string,
    goalsFavor:number,
    goalsOwn:number,
  ):ILeaderboard[] => {
    const newLeaderboard = leadeboard;
    const teamIndex = leadeboard.findIndex((team) => team.name === teamName);
    newLeaderboard[teamIndex].goalsFavor += goalsFavor;
    newLeaderboard[teamIndex].goalsOwn += goalsOwn;
    return newLeaderboard;
  };

  private processLoss = (leadeboard: ILeaderboard[], teamName: string):ILeaderboard[] => {
    const newLeaderboard = leadeboard;
    const teamIndex = leadeboard.findIndex((team) => team.name === teamName);
    newLeaderboard[teamIndex].totalLosses += 1;
    return newLeaderboard;
  };

  checkDrawn = (matches:IMatchComplete[], leadeboard:ILeaderboard[]):ILeaderboard[] => {
    let newLeaderboard = leadeboard;
    matches.forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        newLeaderboard = this.processDraw(newLeaderboard, match.teamHome.teamName);
        newLeaderboard = this.processDraw(newLeaderboard, match.teamAway.teamName);
      }
    });
    return newLeaderboard;
  };

  checkVictories = (matches:IMatchComplete[], leadeboard:ILeaderboard[]):ILeaderboard[] => {
    let newLeaderboard = leadeboard;
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        newLeaderboard = this.processVictory(newLeaderboard, match.teamHome.teamName);
        newLeaderboard = this.processLoss(newLeaderboard, match.teamAway.teamName);
      } else {
        newLeaderboard = this.processLoss(newLeaderboard, match.teamHome.teamName);
        newLeaderboard = this.processVictory(newLeaderboard, match.teamAway.teamName);
      }
    });
    return newLeaderboard;
  };

  countGoals = (matches:IMatchComplete[], leadeboard:ILeaderboard[]):ILeaderboard[] => {
    let newLeaderboard = leadeboard;
    matches.forEach((match) => {
      newLeaderboard = this.processGoals(
        newLeaderboard,
        match.teamHome.teamName,
        match.homeTeamGoals,
        match.awayTeamGoals,
      );
      newLeaderboard = this.processGoals(
        newLeaderboard,
        match.teamAway.teamName,
        match.awayTeamGoals,
        match.homeTeamGoals,
      );
    });
    return newLeaderboard;
  };

  calcGoalBalance = (leaderboard:ILeaderboard[]): ILeaderboard[] => {
    const newLeaderboard = leaderboard;
    newLeaderboard.forEach((team, index) => {
      newLeaderboard[index].goalsBalance = team.goalsFavor - team.goalsOwn;
    });
    return newLeaderboard;
  };

  calcEfficiency = (leaderboard:ILeaderboard[]): ILeaderboard[] => {
    const newLeaderboard = leaderboard;
    newLeaderboard.forEach((team, index) => {
      newLeaderboard[index]
        .efficiency = ((100 * team.totalPoints) / (team.totalGames * 3)).toFixed(2);
    });
    return newLeaderboard;
  };

  calcTotalGames = (leaderboard:ILeaderboard[]): ILeaderboard[] => {
    const newLeaderboard = leaderboard;
    newLeaderboard.forEach((team, index) => {
      newLeaderboard[index].totalGames = team.totalDraws + team.totalLosses + team.totalVictories;
    });
    return newLeaderboard;
  };

  calcTotalPoints = (leaderboard:ILeaderboard[]): ILeaderboard[] => {
    const newLeaderboard = leaderboard;
    newLeaderboard.forEach((team, index) => {
      newLeaderboard[index].totalPoints = team.totalDraws + 3 * team.totalVictories;
    });
    return newLeaderboard;
  };

  sortClassification = (leaderboard:ILeaderboard[]): ILeaderboard[] => {
    const newLeaderboard = leaderboard;
    newLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    return newLeaderboard;
  };
}