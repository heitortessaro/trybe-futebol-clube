import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchesService } from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService:IMatchesService) {}

  listMatches = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this.matchesService.listMatchesInProgress();
      res.status(StatusCodes.OK).json(matches);
    } else {
      const matches = await this.matchesService.listMatches();
      res.status(StatusCodes.OK).json(matches);
    }
  };

  // listMatchesInProgress = async (req:Request, res: Response): Promise<void> => {
  //   const {}
  // }
}
