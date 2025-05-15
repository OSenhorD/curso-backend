import { NextFunction, Request, Response } from 'express';

const ensureParams = (req: Request, res: Response, next: NextFunction) => {
  Object.keys(req.query || {}).forEach(key => {
    switch (req.query[key]) {
      case 'null':
        req.query[key] = null as unknown as string;
        break;
      case 'undefined':
        req.query[key] = undefined;
        break;
      case 'false':
        req.query[key] = false as unknown as string;
        break;
      case 'true':
        req.query[key] = true as unknown as string;
        break;
      default:
        break;
    }
  });

  next();
};

export default ensureParams;
