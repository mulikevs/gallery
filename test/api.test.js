const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server'); // Import the exported app

describe('Gallery API', () => {
    before(() => {
        process.env.NODE_ENV = 'test'; // Set test environment
    });

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

    after(() => {
        process.env.NODE_ENV = 'development'; // Reset environment
    });
});