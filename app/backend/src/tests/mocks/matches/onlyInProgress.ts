import { IMatchComplete } from "../../../interfaces/IMatchComplete";

const onlyInProgress:IMatchComplete[] = [
  {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
          id: 16,
          teamName: "São Paulo"
      },
      teamAway: {
          id: 9,
          teamName: "Internacional"
      }
  },
  {
      id: 42,
      homeTeam: 6,
      homeTeamGoals: 1,
      awayTeam: 1,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
          id: 6,
          teamName: "Ferroviária"
      },
      teamAway: {
          id: 1,
          teamName: "Avaí/Kindermann"
      }
  },
  {
      id: 43,
      homeTeam: 11,
      homeTeamGoals: 0,
      awayTeam: 10,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
          id: 11,
          teamName: "Napoli-SC"
      },
      teamAway: {
          id: 10,
          teamName: "Minas Brasília"
      }
  },
  {
      id: 44,
      homeTeam: 7,
      homeTeamGoals: 2,
      awayTeam: 15,
      awayTeamGoals: 2,
      inProgress: true,
      teamHome: {
          id: 7,
          teamName: "Flamengo"
      },
      teamAway: {
          id: 15,
          teamName: "São José-SP"
      }
  },
  {
      id: 45,
      homeTeam: 5,
      homeTeamGoals: 1,
      awayTeam: 3,
      awayTeamGoals: 1,
      inProgress: true,
      teamHome: {
          id: 5,
          teamName: "Cruzeiro"
      },
      teamAway: {
          id: 3,
          teamName: "Botafogo"
      }
  },
  {
      id: 46,
      homeTeam: 4,
      homeTeamGoals: 1,
      awayTeam: 12,
      awayTeamGoals: 1,
      inProgress: true,
      teamHome: {
          id: 4,
          teamName: "Corinthians"
      },
      teamAway: {
          id: 12,
          teamName: "Palmeiras"
      }
  },
  {
      id: 47,
      homeTeam: 8,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 2,
      inProgress: true,
      teamHome: {
          id: 8,
          teamName: "Grêmio"
      },
      teamAway: {
          id: 14,
          teamName: "Santos"
      }
  },
  {
      id: 48,
      homeTeam: 13,
      homeTeamGoals: 1,
      awayTeam: 2,
      awayTeamGoals: 1,
      inProgress: true,
      teamHome: {
          id: 13,
          teamName: "Real Brasília"
      },
      teamAway: {
          id: 2,
          teamName: "Bahia"
      }
  }
];

export default onlyInProgress;
