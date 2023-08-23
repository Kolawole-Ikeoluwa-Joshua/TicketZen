// app.ts - just configures express application
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@scar-tickets/common';


const app = express();

app.set('trust proxy', true); // allow express trust ingress-nginx
app.use(json());
app.use(
    cookieSession({
        // disable cookie encryption & require https conn
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

// handling routes that dont exist
// handling asynchronous requests
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };