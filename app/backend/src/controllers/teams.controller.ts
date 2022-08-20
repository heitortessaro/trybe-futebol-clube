import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import Teams from '../database/models/teams';
import { ITeamsService } from '../services/teams.service';

export default class TeamsController {
  constructor(private teamsService:ITeamsService) {}

  listTeams = async (_req: Request, res: Response): Promise<void> => {
    const teams = this.teamsService.list();
    res.status(StatusCodes.OK).json(teams);
  };

  getTeamWithId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const team = this.teamsService.findById(id);
    res.status(StatusCodes.OK).json(team);
  };
}
