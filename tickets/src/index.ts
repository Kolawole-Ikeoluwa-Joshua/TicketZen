import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';
import { OrderCreatedListener } from './events/listeners/order-created-listener';

const start = async () => {
    // check for JWT token
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    // database connection
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    // check for NATS_CLIENT_ID
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }

    try{
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        // nats graceful shutdown
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());


        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connnected to MongoDB');
    } catch (err) {
        console.error(err);
    }

    app.listen(5000, () => {
        console.log('Listening on port 5000!!!');
    });

};

start();