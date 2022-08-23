import Teams from '../../database/models/teams';

export interface ITeamsService {
  list(): Promise<Teams[]>,
  findById(id:number): Promise<Teams | null>,
}

export class TeamsService implements ITeamsService {
  list = async (): Promise<Teams[]> => {
    const teams: Teams[] = await Teams.findAll();
    return teams;
  };

  findById = async (id:number): Promise<Teams | null> => {
    const team: Teams | null = await Teams.findByPk(id);
    return team;
  };
}
