// Subclassed custom error for request validation
import { ValidationError } from 'express-validator';


export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]) {
        super();

        // when extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}