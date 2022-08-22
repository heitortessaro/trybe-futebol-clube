// import Teams from 'src/database/models/teams';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

export interface IMatchesService {
  list(): Promise<Matches[]>,
  // findOneByEmail(email: string): Promise<Users | null>,
}

export default class MatchesService implements IMatchesService {
  list = async (): Promise<Matches[]> => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          // ele utiliza o apelido definido na association do belongs to
          as: 'teamHome',
          attributes: { include: ['teamName'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { include: ['teamName'] },
        },
      ],
    });
    return matches;
  };
}
