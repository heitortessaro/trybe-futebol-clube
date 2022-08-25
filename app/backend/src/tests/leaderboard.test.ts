import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
chai.use(chaiHttp);
const { expect } = chai;

import onlyFinished from "./mocks/matches/onlyFinished";
import allResults from "./mocks/leaderboard/allResults";
import awayResults from './mocks/leaderboard/awayResult';
import homeResults from './mocks/leaderboard/homeResult'
import teams from './mocks/teams/teams';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

describe('Leaderboards', () => {
  afterEach(() => {
    sinon.restore();
  })
  it('Return the leaderboard considering just the home games', async () => {
    sinon.stub(Matches, 'findAll').resolves(onlyFinished as unknown as Matches[])
    sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
    const response = await chai.request(app).get('/leaderboard/home')
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body).to.deep.equal(homeResults);
  });
  it('Return the leaderboard considering just the away games', async () => {
    sinon.stub(Matches, 'findAll').resolves(onlyFinished as unknown as Matches[])
    sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
    const response = await chai.request(app).get('/leaderboard/away')
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body).to.deep.equal(awayResults);
  });
  it('Return the complete leaderboard', async () => {
    sinon.stub(Matches, 'findAll').resolves(onlyFinished as unknown as Matches[])
    sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
    const response = await chai.request(app).get('/leaderboard')
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body).to.deep.equal(allResults);
  });
});