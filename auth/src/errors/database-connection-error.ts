// Subclassed custom error for database connection
export class DatabaseConnectionError extends Error {
    reason = 'Error connecting to database';

    constructor() {
        super();

        // when extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}