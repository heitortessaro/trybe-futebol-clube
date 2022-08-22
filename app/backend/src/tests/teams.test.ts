import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import { Response } from 'superagent';
import { ITeam } from '../interfaces/ITeam';
import { StatusCodes } from 'http-status-codes';
import Teams from '../database/models/teams';

chai.use(chaiHttp);

const { expect } = chai;

//  Service Response Mock
const teamsMock: ITeam[] = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
];

const teamMock: ITeam = {
  "id": 1,
  "teamName": "Avaí/Kindermann"
}

describe('Teams', () => {
  describe('Get Teams', () => {
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
});