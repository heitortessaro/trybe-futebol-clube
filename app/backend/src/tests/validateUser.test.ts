import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import { StatusCodes } from 'http-status-codes';

import { JwtPayload } from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

const { expect } = chai;

const verifyMock: JwtPayload = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
}

describe('Users', () => {
  describe('Login/validate', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Should return correct user role if the token is valid with status code 200', async () => {
      // sinon.stub(Users. 'findaOne').
      //verifica o role e o code (200)
      // 
      // sinon.stub(jwt, 'verify').resolves(verifyMock as JwtPayload);
      // example of stubing the jwt.verify: https://itecnote.com/tecnote/javascript-writing-unit-tests-for-method-that-uses-jwt-token-in-javascript/
      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve(verifyMock as JwtPayload);
      });
      const response = await chai.request(app).get('/login/validate').set('authorization', 'token')
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.have.property('role');
      expect(response.body.role).to.equal(verifyMock.role);
    });
    it('Should return erros if the provided token is invalid', async () => {
      // verifica o se o token é valido
      // code 401
      // { "message": "Invalid token" }
      const response = await chai.request(app).get('/login/validate').set('authorization', 'token')
      expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Expired or invalid token');
    });
  });
});