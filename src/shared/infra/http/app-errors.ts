import { NextFunction, Request, Response } from 'express';

import app from '@/shared/infra/http/app';

/*
  eslint-disable-next-line @typescript-eslint/no-unused-vars,
  @typescript-eslint/no-explicit-any
*/
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const obj = {
    error: {
      name: err?.name || err?.error?.name || 'Internal server error',
      message: err?.message || err?.error?.message,
    },
    statusCode: err?.statusCode || 500,
  };

  console.log('app-errors.ts', obj.error, err);

  res.status(500).json(obj);
});
