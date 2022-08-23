import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchesService } from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService:IMatchesService) {}

  listMatches = async (req: Request, res: Response): Promise<void> => {
    const matches = await this.matchesService.listMatches();
    res.status(StatusCodes.OK).json(matches);
  };

  listMatchesInProgress = async (req:Request, res:Response): Promise<void> => {
    const { inProgress } = req.query;
    const matches = await this.matchesService.listMatchesInProgress(inProgress === 'true');
    res.status(StatusCodes.OK).json(matches);
  };

  // listMatchesInProgress = async (req:Request, res: Response): Promise<void> => {
  //   const {}
  // }
}
