import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import IMatchScore from '../interfaces/IMatchScore';
import { ITeamsService } from '../services/teams.service';
import NewError from '../helpers/NewError';
import IMatchInProgress from '../interfaces/IMatchInProgress';
import { IMatchesService } from '../services/matches.service';

export default class MatchesMiddlewares {
  constructor(private matchesService: IMatchesService, private teamsService: ITeamsService) { }

  checkTeamsNotEqual = (req: Request, _res: Response, next: NextFunction) => {
    const matchInfo: IMatchInProgress = req.body;
    if (matchInfo.homeTeam === matchInfo.awayTeam) {
      const errorMessage = 'It is not possible to create a match with two equal teams';
      throw new NewError(errorMessage, StatusCodes.UNAUTHORIZED);
    }
    next();
  };

  checkTeamsExist = async (req: Request, _res: Response, next: NextFunction) => {
    const matchInfo: IMatchInProgress = req.body;
    const homeTeam = await this.teamsService.findById(matchInfo.homeTeam);
    const awayTeam = await this.teamsService.findById(matchInfo.awayTeam);
    if (!homeTeam || !awayTeam) {
      throw new NewError('There is no team with such id!', StatusCodes.NOT_FOUND);
    }
    next();
  };

  checkMatchExist = async (req: Request, _res: Response, next: NextFunction) => {
    const { id } = req.params;
    const match = await this.matchesService.findMatchById(parseInt(id, 10));
    if (!match) throw new NewError('There is no match with such id!', StatusCodes.NOT_FOUND);
    const { inProgress } = match;
    req.body.inProgress = inProgress;
    req.body.id = parseInt(id, 10);
    next();
  };

  updateMatchInfoExist = async (req: Request, _res: Response, next: NextFunction) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const schema = Joi.object({
      homeTeamGoals: Joi.number().integer().required(),
      awayTeamGoals: Joi.number().integer().required(),
    });
    try {
      await schema.validateAsync({ homeTeamGoals, awayTeamGoals });
    } catch (error) {
      console.log(error);
      throw new NewError('All fields must be filled', StatusCodes.BAD_REQUEST);
    }
    req.body.newScore = { homeTeamGoals, awayTeamGoals } as IMatchScore;
    next();
  };

  checkGameIsInProgress = (req: Request, _res: Response, next: NextFunction) => {
    const { inProgress } = req.body;
    if (!inProgress) {
      throw new NewError('The match has already been finished', StatusCodes.BAD_REQUEST);
    }
    next();
  };
}
