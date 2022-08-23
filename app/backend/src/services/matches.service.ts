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
  findMatchById(matchId:number): Promise<Matches | null>,
  finishGame(matchId:number): Promise<Matches>,
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

  findMatchById = async (matchId:number): Promise<Matches | null> => {
    const match = await Matches.findByPk(matchId);
    return match;
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

  finishGame = async (matchId:number): Promise<Matches> => {
    const match = await Matches.findByPk(matchId);
    const inProgress = false;
    match?.set({ inProgress });
    await match?.save();
    await match?.reload();
    return match as Matches;
  };
}
