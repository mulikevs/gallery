const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server');

describe('Gallery API', () => {
  it('should return 200 for GET /', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
});