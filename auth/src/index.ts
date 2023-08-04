import mongoose from 'mongoose';
import { app } from './app';

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

    app.listen(5000, () => {
        console.log('Listening on port 5000!!!');
    });

};

start();