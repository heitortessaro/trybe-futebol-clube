import IMatch from "../../../interfaces/IMatch"
import IMatchInProgress from "../../../interfaces/IMatchInProgress"

export const caseValid:IMatchInProgress = {
  homeTeam: 16,
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

export const caseValidReponse:IMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
}

export const caseTeamsSameId:IMatchInProgress = {
  homeTeam: 8, 
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

export const caseTeamNoExist:IMatchInProgress = {
  homeTeam: 888,
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2
}
