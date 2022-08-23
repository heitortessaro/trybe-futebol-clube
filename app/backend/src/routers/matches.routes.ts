import { Router } from 'express';
import MatchesMiddlewares from '../middleware/matches.middleware';
import MatchesController from '../controllers/matches.controllers';
import MatchesService from '../services/databaseInteraction/matches.service';
import { TeamsService } from '../services/databaseInteraction/teams.service';
import UsersMiddleware from '../middleware/users.middleware';
import { UsersService } from '../services/databaseInteraction/users.service';

const router = Router();

const usersService = new UsersService();
const teamsService = new TeamsService();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);
const matchesMiddleware = new MatchesMiddlewares(matchesService, teamsService);
const usersMiddleware = new UsersMiddleware(usersService);

router.post(
  '/matches',
  matchesMiddleware.checkTeamsNotEqual,
  matchesMiddleware.checkTeamsExist,
  usersMiddleware.validateAuthorizationToken,
  matchesController.addMatchInProgress,
);

router.get(
  '/matches',
  matchesController.listMatches,
);

router.patch(
  '/matches/:id/finish',
  matchesMiddleware.checkMatchExist,
  matchesController.finishMatch,
);

router.patch(
  '/matches/:id/',
  matchesMiddleware.checkMatchExist,
  matchesMiddleware.checkGameIsInProgress,
  matchesMiddleware.updateMatchInfoExist,
  matchesController.updateMatchInProgress,
);

export default router;
