import { createServer } from './config/server';
import { connectDB } from './config/db';
import logger from './utils/logger/';

require('dotenv').config();
require('./kafka/kafkaPriceConsumer');
// import { kafkaPriceConsumer } from './kafka/kafkaPriceConsumer';

const DBURI = process.env.DB_URI || '';
const PORT = Number(process.env.PORT || 3001);

/** Connect to db */
const startServer = async () => {
  try {
    const app = await createServer();
    await connectDB(DBURI, undefined);
    logger.info("start",'sucessfully connected to mongo db');
    app.listen(PORT, () => {
      logger.info("start",`Your server is listening on port: ${PORT}`);
      logger.info("start",`Swagger-ui is available on http://localhost:${PORT}/docs`);
      logger.info("start",`Graphql interface is available on http://localhost:${PORT}/formula/graphql`);
    });
  } catch (error: unknown?) {
    logger.error("start",`error while connecting to db: , ${error.message}`);
    process.exit(1);
  }
};
startServer();
