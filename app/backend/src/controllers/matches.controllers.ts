import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchesService } from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService:IMatchesService) {}

  listMatches = async (_req: Request, res: Response): Promise<void> => {
    const matches = await this.matchesService.list();
    console.log('recebeu');
    res.status(StatusCodes.OK).json(matches);
  };
}
