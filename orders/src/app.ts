// app.ts - just configures express application
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@scar-tickets/common';

import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';

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

// middlewares & route handlers

app.use(currentUser);
app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);


// handling routes that dont exist
// handling asynchronous requests
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };