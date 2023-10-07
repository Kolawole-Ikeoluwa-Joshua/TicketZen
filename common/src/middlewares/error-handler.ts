// custom error handling middleware
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // defining a common error response structure
  if (err instanceof CustomError) {  
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // response for generic/unplanned errors
  console.error(err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong'}]
  });
};
