import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeamsService } from '../services/teams.service';
import NewError from '../helpers/NewError';
import IMatchInProgress from '../interfaces/IMatchInProgress';
import { IMatchesService } from '../services/matches.service';

export default class MatchesMiddlewares {
  constructor(private matchesService:IMatchesService, private teamsService:ITeamsService) {}

  checkTeamsNotEqual = (req: Request, _res:Response, next:NextFunction) => {
    const matchInfo:IMatchInProgress = req.body;
    if (matchInfo.homeTeam === matchInfo.awayTeam) {
      const errorMessage = 'It is not possible to create a match with two equal teams';
      throw new NewError(errorMessage, StatusCodes.UNAUTHORIZED);
    }
    next();
  };

  checkTeamsExist = async (req: Request, _res:Response, next:NextFunction) => {
    const matchInfo:IMatchInProgress = req.body;
    const homeTeam = await this.teamsService.findById(matchInfo.homeTeam);
    const awayTeam = await this.teamsService.findById(matchInfo.awayTeam);
    if (!homeTeam || !awayTeam) {
      throw new NewError('There is no team with such id!', StatusCodes.NOT_FOUND);
    }
    next();
  };
}
