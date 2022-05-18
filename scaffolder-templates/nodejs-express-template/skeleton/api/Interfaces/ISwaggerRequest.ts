import { Request } from 'express';

export interface SwaggerRequest extends Request {
  swagger: { params: { [x: string]: { value: string | number | undefined | null } } }
}
