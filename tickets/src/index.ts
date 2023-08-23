import mongoose from 'mongoose';
import { app } from './app';

// database connection
const start = async () => {
    // check for JWT token
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try{
        await mongoose.connect('process.env.MONGO_URI');
        console.log('Connnected to MongoDB');
    } catch (err) {
        console.error(err);
    }

    app.listen(5000, () => {
        console.log('Listening on port 5000!!!');
    });

};

start();