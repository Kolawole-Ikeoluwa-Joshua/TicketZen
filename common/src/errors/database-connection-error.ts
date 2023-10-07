// Subclassed custom error for database connection
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';

    // when extending a built in class
    constructor() {
        super('Error connecting to database');  
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }]
    }
}