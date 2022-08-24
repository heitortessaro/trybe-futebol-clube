import { IMatchComplete } from '../../interfaces/IMatchComplete';
import { ILeaderboard } from '../../interfaces/ILeaderboard';

export interface ILeaderboardService {
  returnLeaderBoardHome(matches:IMatchComplete): Promise<ILeaderboard[]>,
  returnLeaderBoardAway(): Promise<ILeaderboard[]>,
  returnLeaderBoard(): Promise<ILeaderboard[]>,
}

export default class LeaderboardService implements ILeaderboardService {
  returnLeaderBoardHome = (matches:IMatchComplete): Promise<ILeaderboard[]> => {
    console.log(matches);
    throw new Error('Method  implemented.');
  };

  returnLeaderBoardAway = (): Promise<ILeaderboard[]> => {
    throw new Error('Method not implemented.');
  };

  returnLeaderBoard = (): Promise<ILeaderboard[]> => {
    throw new Error(' not implemented.');
  };
}
