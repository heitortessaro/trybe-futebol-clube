import { Router } from 'express';
import MatchesController from '../controllers/matches.controllers';
import MatchesService from '../services/matches.service';

const router = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get(
  '/matches/:inProgress',
  matchesController.listMatchesInProgress,
);

router.get(
  '/matches',
  matchesController.listMatches,
);

export default router;
