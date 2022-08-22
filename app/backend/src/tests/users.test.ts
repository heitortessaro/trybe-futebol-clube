import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../dat abase/models/ExampleModel';

import { Response } from 'superagent';
import { IUser } from '../interfaces/IUsers';
import Users from '../database/models/users';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

//  Service Response Mock
const userMock: IUser = {
  id: 1,
  username: 'any-username',
  email: 'admin@admin.com',
  role: 'any-role',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

// login cases
const caseNoPassword = {
  email: userMock.email,
  password: ''
}

const caseNoEmail = {
  email: '',
  password: userMock.password,
}

const caseWrongUser = {
  email: 'other-mail@mail.com',
  password: 'other-hash',
}

const caseWrongPassword = {
  email: userMock.email,
  password: 'wrong-hash',
}

const validUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

describe('Users', () => {
  describe('Login', () => {
    beforeEach(() => {
      sinon.stub(Users, 'findOne').resolves(userMock as Users)
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Should return token in case user provide valid data with status code 200', async () => {
      // sinon.stub(Users, 'findOne').resolves(userMock as Users)
      const response = await chai.request(app).post('/login').send(validUser);
      // console.log(response);
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
      // sinon.restore();
    });
    it('Should return erros if user provide invalid email', async () => {
      // se o password ou o username batem com o db
      //code 401
      //{ "message": "Incorrect email or password" }
      const response = await chai.request(app).post('/login').send(caseWrongUser);
      expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Incorrect email or password');
    });
    it('Should return erros if user provide invalid password', async () => {
      // se o password ou o username batem com o db
      //code 401
      //{ "message": "Incorrect email or password" }
      const response = await chai.request(app).post('/login').send(caseWrongPassword);
      expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Incorrect email or password');
    });
    it('Should return erro if user not provide email ', async () => {
      // code 400 
      // { "message": "All fields must be filled" } 
      const response = await chai.request(app).post('/login').send(caseNoEmail);
      expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('All fields must be filled');
    });
    it('Should return erro if user not provide password ', async () => {
      // code 400 
      // { "message": "All fields must be filled" }
      const response = await chai.request(app).post('/login').send(caseNoPassword);
      expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('All fields must be filled');
    });
  });
});