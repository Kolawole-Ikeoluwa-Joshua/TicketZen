// app.ts - just configures express application
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

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

// connect routes to express app
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// handling routes that dont exist
// handling asynchronous requests
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };