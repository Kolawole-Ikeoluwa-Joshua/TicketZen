import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";

// Define an interface for the payload that the queue will process
interface Payload {
    orderId: string;
}

// Create a new instance of the Queue class named "expirationQueue"
const expirationQueue = new Queue('order:expiration', {
    // Configure the Redis connection for the queue
    redis: {
        host: process.env.REDIS_HOST
    },
});

// process a job
expirationQueue.process(async (job) => {
    // publish an event to NATS with the orderId from the job data
    new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId,
    });
});

export { expirationQueue };