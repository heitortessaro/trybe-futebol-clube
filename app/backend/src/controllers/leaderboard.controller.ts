import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderboardService } from '../services/leaderboard/leaderboard.service';
import { IMatchesService } from '../services/databaseInteraction/matches.service';
// import Matches from '../database/models/matches';
import { IMatchComplete } from '../interfaces/IMatchComplete';
import { ITeamsService } from '../services/databaseInteraction/teams.service';

export default class LeaderboardController {
  constructor(
    private matchesService:IMatchesService,
    private leaderboardService:ILeaderboardService,
    private teamsService:ITeamsService,
  ) {}

  getLeaderboardHome = async (_req: Request, res: Response): Promise<void> => {
    const inProgress = false;
    const endedMatches = await this.matchesService.listMatchesInProgress(inProgress);
    const teams = await this.teamsService.list();
    const leaderboard = this
      .leaderboardService.LeaderboardHome(
        endedMatches as unknown as IMatchComplete[],
        teams,
      );
    res.status(StatusCodes.OK).json(leaderboard);
  };

  getLeaderboardAway = async (_req: Request, res: Response): Promise<void> => {
    const inProgress = false;
    const endedMatches = await this.matchesService.listMatchesInProgress(inProgress);
    const teams = await this.teamsService.list();
    const leaderboard = this
      .leaderboardService.LeaderboardAway(
        endedMatches as unknown as IMatchComplete[],
        teams,
      );
    res.status(StatusCodes.OK).json(leaderboard);
  };

  getLeaderboard = async (_req: Request, res: Response): Promise<void> => {
    const inProgress = false;
    const endedMatches = await this.matchesService.listMatchesInProgress(inProgress);
    const teams = await this.teamsService.list();
    const leaderboard = this
      .leaderboardService.Leaderboard(
        endedMatches as unknown as IMatchComplete[],
        teams,
      );
    res.status(StatusCodes.OK).json(leaderboard);
  };
}
