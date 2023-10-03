import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear()

const stan = nats.connect('ticketzen', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    // customizing subscriptions
    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true);

    // subscription listens to channel
    // queue group = orders-service-queue-group
    const subscription = stan.subscribe(
        'ticket:created', 
        'orders-service-queue-group',
        options
    );

    subscription.on('message', (msg: Message) => {
       const data = msg.getData();

       if (typeof data === 'string') {
            console.log(
                `Received event #${msg.getSequence()}, with data: ${data}`
            );
       }

       // manual ack mode - to successfully complete message processing
       msg.ack();

    });
});

