import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import { Response } from 'superagent';
import { ITeam } from '../interfaces/ITeam';
import { StatusCodes } from 'http-status-codes';
import Teams from '../database/models/teams';
// const teams = require('./mocks/teams/teams')
import teams from './mocks/teams/teams'


chai.use(chaiHttp);

const { expect } = chai;

//  Service Response Mock
const teamsMock: ITeam[] = teams;
const teamMock: ITeam = teams[1];
// [
//   {
//     "id": 1,
//     "teamName": "Avaí/Kindermann"
//   },
//   {
//     "id": 2,
//     "teamName": "Bahia"
//   },
//   {
//     "id": 3,
//     "teamName": "Botafogo"
//   },
// ];

// const teamMock: ITeam = {
//   "id": 1,
//   "teamName": "Avaí/Kindermann"
// }

describe('Teams', () => {
  describe('Get All Teams', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Should return a team list with status code 200', async () => {
      sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[])
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(teamsMock);
    });
    it('Should return an object with the related team information status code 200', async () => {
      sinon.stub(Teams, 'findOne').resolves(teamMock as Teams)
      const response = await chai.request(app).get('/teams/1');
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(teamMock);
    });
  });
  describe('Get Teams by Id', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Should return an object with the related team information status code 200', async () => {
      sinon.stub(Teams, 'findOne').resolves(teamMock as Teams)
      const response = await chai.request(app).get('/teams/1');
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(teamMock);
    });
    it('Should return an error message when team id does not exist', async () => {
      sinon.stub(Teams, 'findOne').resolves(null)
      const response = await chai.request(app).get('/teams/100');
      expect(response.status).to.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('There is no team with such id!')
    })
  })
});