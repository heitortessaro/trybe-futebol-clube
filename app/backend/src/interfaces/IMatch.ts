import IMatchInProgress from './IMatchInProgress';

export default interface IMatch extends IMatchInProgress{
  inProgress: boolean,
  id: number,
}
