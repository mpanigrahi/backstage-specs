export const rTracer = require('cls-rtracer');
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format;

const LOGLEVEL = process.env.LOG_LEVEL;

const loggerConfig = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
};

const logLevels = Object.keys(loggerConfig.levels);

const rTracerFormat = printf((info: any) => {
  const rid = rTracer.id();
  let logInfo = {...info, correlationId: rid};
  return JSON.stringify(logInfo);
})

export const logger = createLogger({
  levels: loggerConfig.levels,
  level: (LOGLEVEL && logLevels.includes(LOGLEVEL?.toLowerCase()))? LOGLEVEL.toLowerCase(): 'http',
  transports: new transports.Console({
    format: format.combine(
      format.label({ label: process.env.npm_package_name }),
      format.timestamp(),
      format.json(),
      rTracerFormat
    ),
  }),
});

