import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import Teams from '../database/models/teams';
import { ITeamsService } from '../services/databaseInteraction/teams.service';

export default class TeamsController {
  constructor(private teamsService:ITeamsService) {}

  listTeams = async (_req: Request, res: Response): Promise<void> => {
    const teams = await this.teamsService.list();
    res.status(StatusCodes.OK).json(teams);
  };

  getTeamWithId = async (req: Request, res: Response): Promise<void> => {
    const { teamInfo } = req.body;
    // const { id } = req.params;
    // const team = await this.teamsService.findById(parseInt(id, 10));
    res.status(StatusCodes.OK).json(teamInfo);
  };
}
