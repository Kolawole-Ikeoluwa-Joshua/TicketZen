import nats from 'node-nats-streaming';

const stan = nats.connect('ticketzen', 'abc', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS');
});