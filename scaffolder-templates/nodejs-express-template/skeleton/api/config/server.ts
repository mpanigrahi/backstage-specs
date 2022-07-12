import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import swaggerTools, { Middleware20 } from 'swagger-tools';
import { rTracer } from '../utils/logger/logger-config';
const jsyaml = require('js-yaml');

const app = express();

// enable thread localisation for correlationid
app.use(rTracer.expressMiddleware({
  useHeader: true,
  headerName: 'x-consumer-correlation-id'
}));
export function createServer() {
  const options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, '../controllers'),
    useStubs: process.env.NODE_ENV === 'development', // Conditionally turn on stubs (mock mode)
  };
  // The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
  const spec = fs.readFileSync(path.join(__dirname, '../api/swagger.yaml'), 'utf8');
  const swaggerDoc = jsyaml.load(spec);
  swaggerTools.initializeMiddleware(swaggerDoc, (middleware: Middleware20) => {
    // Interpret Swagger resources and attach metadata to request
    // - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    // app.use(middleware.swaggerValidator())

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi({swaggerUi: "/docs", apiDocs: "/api-docs"}));

    // Enable CORS
    app.use(cors());
  });
  return app;
}
