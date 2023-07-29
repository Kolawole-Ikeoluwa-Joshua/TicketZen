import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
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
        secure: true
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

// database connection
const start = async () => {
    // check for JWT token
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connnected to MongoDB');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!');
    });

};

start();