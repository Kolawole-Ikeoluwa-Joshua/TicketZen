import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear()
//clientid = abc
const stan = nats.connect('ticketzen', 'abc', {
    url: 'http://localhost:4222',
});

stan.on('connect', async () => {
    console.log('Publisher connected to NATS');
    
    const publisher = new TicketCreatedPublisher(stan);
    try {
        await publisher.publish({
            id: '123',
            title: 'concert',
            price: 20
        });
    } catch (err) {
        console.error(err);
    }

    // nats streaming server only accepts strings as messages
    // const data = JSON.stringify({
    //     id: '123',
    //     title: 'concert',
    //     price: 20
    // });

    // // topic/channel = ticket:created
    // stan. publish('ticket:created', data, () => {
    //     console.log('Event published');
    // });

});