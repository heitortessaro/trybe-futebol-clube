import { Router } from 'express';
import MatchesService from '../services/databaseInteraction/matches.service';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard/leaderboard.service';

const router = Router();

const matchesService = new MatchesService();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(matchesService, leaderboardService);

router.get(
  '/leaderboard/home',
  leaderboardController.getLeaderboardHome,
);

export default router;
