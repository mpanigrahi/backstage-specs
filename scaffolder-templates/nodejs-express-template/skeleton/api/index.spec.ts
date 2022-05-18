// import request from 'supertest';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
// import httpstatus from './config/http-status';
import { kafkaPriceConsumer } from './kafka/kafkaPriceConsumer';

// const { createServer } = require('./config/server');

// const app = createServer();
require('dotenv').config();

describe.skip('Formula details', () => {
  beforeAll(async () => {
    const DBURI = process.env.DB_URI || 'mongodb://localhost:27017/local';
    await connectDB(DBURI, undefined);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  /**
   * [INFO]: Test case to retrive Formula details
   */
  test('it fetch the data from DB and returns 200 ', async () => {
    jest.setTimeout(30000);
    await kafkaPriceConsumer()
      .then((response) => {
        // console.log('Unit testing', response);
        expect(response).toContain('success');
      });
  });
});
