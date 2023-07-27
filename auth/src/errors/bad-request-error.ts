import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    // convert the error object into a standardized format
    serializeErrors() {
        return [{ message: this.message }];
    }
}