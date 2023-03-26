const request = require('supertest');
const chai = require('chai');
const app = require('../api/app');

const expect = chai.expect;

describe('Testing back-end', () => {
  it('Must add new record to JSON file', async () => {
    const response = await request(app)
      .post('/')
      .send({ time: 'teste' });
    expect(response.statusCode).to.equal(201);
  });

  it('Should return a list of records', async () => {
    const response = await request(app).get('/records');
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Must delete all records from JSON file', async () => {
    const response = await request(app).delete('/records');
    expect(response.statusCode).to.equal(202);
    expect(response.text).to.equal('Record successfully saved');
  });
});
