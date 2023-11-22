import Queue from "bull";

interface Payload {
    orderId: string;
}

const expirationQueue = new Queue('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});

expirationQueue.process(async (job) => {
    console.log('publish expiration:complete event for orderId', job.data.orderId);
});

export { expirationQueue };