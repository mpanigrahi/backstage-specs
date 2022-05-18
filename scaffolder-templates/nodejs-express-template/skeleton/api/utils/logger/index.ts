import { logger } from "./logger-config";
class Log {
  
  static error(stepName: string, message: any, eventId?: any) {
    logger.error(message, {
      stepName,
      eventId
    });
  }

  static warn(stepName: string, message: any, eventId?: any) {
    logger.warn(message, {
      stepName,
      eventId
    });
  }

  static info(stepName: string, message: any, eventId?: any) {
    logger.info(message, {
      stepName,
      eventId
    });
  }

  static debug(stepName: string, message: any, eventId?: any) {
    logger.debug(message, {
      stepName,
      eventId
    });
  }

  static http(stepName: string, message: any, eventId?: any) {
    logger.http(message, {
      stepName,
      eventId
    });
  }

  static transaction(req: any){
    const message = {
      headers: req.headers,
      httpVersion: req.httpVersion,
      method: req.method,
      originalUrl: req.originalUrl,
      url: req.url,
      query: req.query,
      params: req.params,
      body: req.body,
    };
    logger.http('Incoming request', message);
  };
}
export default Log;
