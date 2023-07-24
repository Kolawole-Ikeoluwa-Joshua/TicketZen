// custom error handling middleware
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // defining a common error response structure
  if (err instanceof RequestValidationError) {  
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // response for generic/unplanned errors
  res.status(400).send({
    errors: [{ message: 'Something went wrong'}]
  });
};
