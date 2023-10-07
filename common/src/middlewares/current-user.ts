// middleware for whenever we have a route handler
// that needs to know who the currentuser is
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

//modify existing type definition for Express Request interface
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}


export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // check if currentuser has a session
    if (!req.session?.jwt) {
        return next();
    }

    try {
        // decode JWT, valid JWT?
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch (err) {}

    next();
};