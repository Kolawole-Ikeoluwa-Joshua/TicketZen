// abstract class to setup requirements for error subclasses
export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[]
}
