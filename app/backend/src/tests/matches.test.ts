import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
chai.use(chaiHttp);
const { expect } = chai;

import { JwtPayload } from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

import allMatches from "./mocks/matches/allMatches";
import onlyInProgress from "./mocks/matches/onlyInProgress";
import onlyFinished from "./mocks/matches/onlyFinished";
import { caseValid, caseValidReponse, caseTeamNoExist, caseTeamsSameId } from './mocks/matches/validationCases'
import teams from './mocks/teams/teams';
import Matches from '../database/models/matches';
import { IMatchComplete } from '../interfaces/IMatchComplete';
import Teams from '../database/models/teams';

const verifyMock: JwtPayload = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
}

describe('Teams', () => {
  describe('Get all matches', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Should return a list with all matches and status code 200', async () => {
      sinon.stub(Matches, 'findAll').resolves(allMatches as unknown as Matches[])
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(allMatches);
    });
    it('Should return a list with all finished matches and status code 200', async () => {
      sinon.stub(Matches, 'findAll').resolves(onlyFinished as unknown as Matches[])
      const response = await chai.request(app).get('/matches?inProgress=false');
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(onlyFinished);
    });
    it('Should return a list with all in progress matches and status code 200', async () => {
      sinon.stub(Matches, 'findAll').resolves(onlyInProgress as unknown as Matches[])
      const response = await chai.request(app).get('/matches?inProgress=true');
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(onlyInProgress);
    });
  });
  describe.only('Save an match in progress', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('Should return the info of created team', async () => {
      sinon.stub(jwt, 'verify').returns(verifyMock as JwtPayload);
      sinon.stub(Teams, 'findAll').resolves([teams[0], teams[1]] as Teams[])
      sinon.stub(Matches, 'create').resolves(caseValidReponse as unknown as Matches)
      const response = await chai.request(app).post('/matches').set('authorization', 'token').send(caseValid);
      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.body).to.deep.equal(caseValidReponse);
    });
    it('Should return an error for equal teams', async () => {
      const response = await chai.request(app).post('/matches').set('authorization', 'token').send(caseTeamsSameId);
      expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('It is not possible to create a match with two equal teams');
    });
    it('Should return an error if team not exist', async () => {
      sinon.stub(Teams, 'findAll').resolves([teams[0]] as Teams[])
      const response = await chai.request(app).post('/matches').set('authorization', 'token').send(caseTeamNoExist);
      expect(response.status).to.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('There is no team with such id!');
    });
    it('Should return an error if no valid authorization token is provided', async () => {
      sinon.stub(Teams, 'findAll').resolves([teams[0], teams[1]] as Teams[])
      sinon.stub(Matches, 'create').resolves(caseValidReponse as unknown as Matches)
      const response = await chai.request(app).post('/matches').set('authorization', 'token').send(caseValid);
      expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Token must be a valid token');
    });
  })
});