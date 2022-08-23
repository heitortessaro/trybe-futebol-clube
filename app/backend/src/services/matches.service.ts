// import Teams from 'src/database/models/teams';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

export interface IMatchesService {
  listMatches(): Promise<Matches[]>,
  listMatchesInProgress(inProgress:boolean): Promise<Matches[]>,
}

export default class MatchesService implements IMatchesService {
  listMatches = async (): Promise<Matches[]> => {
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

  listMatchesInProgress = async (inProgress:boolean): Promise<Matches[]> => {
    const matches = await Matches.findAll({
      where: { title: { inProgress } },
      include: [
        { model: Teams, as: 'teamHome', attributes: { include: ['teamName'] } },
        { model: Teams, as: 'teamAway', attributes: { include: ['teamName'] } },
      ],
    });
    return matches;
  };
}
