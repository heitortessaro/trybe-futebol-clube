// import Teams from 'src/database/models/teams';
import { StatusCodes } from 'http-status-codes';
import IMatchInProgress from '../interfaces/IMatchInProgress';
import NewError from '../helpers/NewError';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import IMatch from '../interfaces/IMatch';

export interface IMatchesService {
  listMatches(): Promise<Matches[]>,
  listMatchesInProgress(inProgress:boolean): Promise<Matches[]>,
  addMatchInProgress(matchInfo:IMatchInProgress): Promise<IMatch>,
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
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { include: ['teamName'] } },
        { model: Teams, as: 'teamAway', attributes: { include: ['teamName'] } },
      ],
    });
    return matches;
  };

  addMatchInProgress = async (matchInfo:IMatchInProgress) : Promise<IMatch> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matchInfo;
    const inProgress = true;
    const result = await Matches
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
    if (result) {
      return {
        id: result.id,
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress,
      } as IMatch;
    }
    throw new NewError('Error adding data to the DB', StatusCodes.INTERNAL_SERVER_ERROR);
  };
}
