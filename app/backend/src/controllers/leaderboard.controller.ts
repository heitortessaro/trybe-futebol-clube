import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderboardService } from '../services/leaderboard/leaderboard.service';
import { IMatchesService } from '../services/databaseInteraction/matches.service';
// import Matches from '../database/models/matches';
import { IMatchComplete } from '../interfaces/IMatchComplete';

export default class LeaderboardController {
  constructor(
    private matchesService:IMatchesService,
    private leaderboardService:ILeaderboardService,
  ) {}

  getLeaderboardHome = async (_req: Request, res: Response): Promise<void> => {
    const inProgress = false;
    const endedMatches = await this.matchesService.listMatchesInProgress(inProgress);
    const leaderboard = await this
      .leaderboardService.returnLeaderBoardHome(endedMatches as unknown as IMatchComplete);
    res.status(StatusCodes.OK).json(leaderboard);
  };
}
