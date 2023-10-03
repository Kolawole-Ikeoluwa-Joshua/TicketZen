import nats from 'node-nats-streaming';

console.clear()
//clientid = abc
const stan = nats.connect('ticketzen', 'abc', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    // nats streaming server only accepts strings as messages
    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20
    });

    // topic/channel = ticket:created
    stan. publish('ticket:created', data, () => {
        console.log('Event published');
    });

});