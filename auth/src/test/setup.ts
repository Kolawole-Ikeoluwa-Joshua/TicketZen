import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

// let typescript know there is a global interface with signin property
declare global {
    var signin: () => Promise<string[]>;
}

let mongo: any;
// hook runs before all tests
beforeAll(async () => {
    
    process.env.JWT_KEY = 'asdkfk'; // to by pass failed signup test

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});
// hook runs before each tests
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});
// hook runs after all tests
afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

// get auth cookie helper function
global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
};