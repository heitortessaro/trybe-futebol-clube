import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import { TeamsService } from '../services/databaseInteraction/teams.service';

const router = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get(
  '/teams',
  teamsController.listTeams,
);

router.get(
  '/teams/:id',
  teamsController.getTeamWithId,
);

export default router;
