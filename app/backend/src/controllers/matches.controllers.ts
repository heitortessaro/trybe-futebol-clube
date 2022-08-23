import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchesService } from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService:IMatchesService) {}

  listMatches = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const matches = await this.matchesService.listMatches();
      res.status(StatusCodes.OK).json(matches);
    } else {
      const matches = await this.matchesService.listMatchesInProgress(inProgress === 'true');
      res.status(StatusCodes.OK).json(matches);
    }
  };

  addMatchInProgress = async (req:Request, res:Response): Promise<void> => {
    const matchInfo = req.body;
    const match = await this.matchesService.addMatchInProgress(matchInfo);
    res.status(StatusCodes.CREATED).json(match);
  };

  finishMatch = async (req:Request, res:Response): Promise<void> => {
    const { id } = req.body;
    const match = await this.matchesService.finishGame(id);
    if (match) res.status(StatusCodes.OK).json({ message: 'Finished' });
  };
}
