import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear()

const stan = nats.connect('ticketzen', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    // event handler for client shutdown
    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });

    new TicketCreatedListener(stan).listen();

});

// listen for interrupt or shutdown signals
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
