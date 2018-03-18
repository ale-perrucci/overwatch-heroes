const request = require('supertest');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const app = require('../server').app;
const expect = chai.expect;
const api = request('http://localhost:5000/api/');

chai.use(chaiSubset);

describe('Server', () => {

  describe('GET /heroes', () => {
    it('should return an array of 10 heroes', (done) => {
      api.get('heroes')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.be.an('array'); 
          expect(res.body).to.have.length(10); 
          expect(res.body).to.not.be.empty; 
          done(); 
        }); 
    });
  });

  describe('GET /heroes?number=3', () => {
    it('should return an array of 3 heroes', (done) => {
      api.get('heroes?number=3')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.be.an('array'); 
          expect(res.body).to.have.length(3); 
          expect(res.body).to.not.be.empty; 
          done(); 
        }); 
    });
  });

  describe('GET /heroes?lastname=Ana', () => {
    it('should return an array of heroes starting from Bastion', (done) => {
      api.get('heroes?lastname=Ana')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body[0]).to.be.an('object').that.containSubset({attributes: {'name': 'Bastion'}}); 
          expect(res.body).to.not.be.empty; 
          done(); 
        }); 
    });
  });

  describe('GET /heroes?filter=bast', () => {
    it('should return an array with only hero Bastion', (done) => {
      api.get('heroes?filter=bast')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.have.length(1); 
          expect(res.body[0]).to.be.an('object').that.containSubset({attributes: {'name': 'Bastion'}}); 
          expect(res.body).to.not.be.empty; 
          done(); 
        }); 
    });
  });

  describe('GET /heroes/bastion', () => {
    it('should return hero Bastion', (done) => {
      api.get('heroes/bastion')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.not.be.empty; 
          expect(res.body).to.be.an('object').that.includes.keys("attributes", "links", "relationships");
          expect(res.body).to.containSubset({attributes: {'name': 'Bastion'}});
          done(); 
        }); 
    });
  });

  describe('GET /heroes/x', () => {
    it('should return empty object', (done) => {
      api.get('heroes/x')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.be.an('object'); 
          expect(res.body).to.be.empty; 
          done(); 
        }); 
    });
  });
});
