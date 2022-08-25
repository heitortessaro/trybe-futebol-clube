import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import NewError from '../helpers/NewError';

import { ITeamsService } from '../services/databaseInteraction/teams.service';

export default class TeamsMiddlewares {
  constructor(private teamsService: ITeamsService) {}

  checkTeamExist = async (req: Request, _res: Response, next: NextFunction) => {
    const { id } = req.params;
    const teamInfo = await this.teamsService.findById(parseInt(id, 10));
    if (!teamInfo) throw new NewError('There is no team with such id!', StatusCodes.NOT_FOUND);
    req.body.teamInfo = teamInfo;
    next();
  };
}
