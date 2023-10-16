import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


// let typescript know there is a global interface with signin property
declare global {
    var signin: () => string[];
}

// mock natsWrapper
jest.mock('../nats-wrapper');

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
    // reset natsWrapper
    jest.clearAllMocks();

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
global.signin = () => {
    // Build a JWT payload, { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };
    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!);  

    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return [`session=${base64}`];
};