import { Router } from 'express';
import MatchesService from '../services/databaseInteraction/matches.service';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard/leaderboard.service';
import { TeamsService } from '../services/databaseInteraction/teams.service';
import LeaderboardDTService from '../services/leaderboard/dataTreatement.service';

const router = Router();

const matchesService = new MatchesService();
const leaderboardDTService = new LeaderboardDTService();
const leaderboardService = new LeaderboardService(leaderboardDTService);
const teamsService = new TeamsService();
const leaderboardController = new
LeaderboardController(matchesService, leaderboardService, teamsService);

router.get(
  '/leaderboard/home',
  leaderboardController.getLeaderboardHome,
);

router.get(
  '/leaderboard/away',
  leaderboardController.getLeaderboardAway,
);

router.get(
  '/leaderboard',
  leaderboardController.getLeaderboard,
);

export default router;
