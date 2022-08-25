import { Router } from 'express';
import TeamsMiddlewares from '../middleware/teams.middleware';
import TeamsController from '../controllers/teams.controller';
import { TeamsService } from '../services/databaseInteraction/teams.service';

const router = Router();

const teamsService = new TeamsService();
const teamsMiddlewares = new TeamsMiddlewares(teamsService);
const teamsController = new TeamsController(teamsService);

router.get(
  '/teams',
  teamsController.listTeams,
);

router.get(
  '/teams/:id',
  teamsMiddlewares.checkTeamExist,
  teamsController.getTeamWithId,
);

export default router;
