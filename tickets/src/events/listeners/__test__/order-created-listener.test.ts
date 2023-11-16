import mongoose from "mongoose"
import { Message } from "node-nats-streaming"
import { OrderCreatedEvent, OrderStatus } from "@scar-tickets/common"
import { OrderCreatedListener } from "../order-created-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Ticket } from "../../../models/ticket"

const setup = async () => {
    // create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client);

    // create and save a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'asdf'
    });
    await ticket.save();

    // create the fake data event
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: 'hdhfhf',
        expiresAt: 'dhuaa9',
        ticket:{
            id: ticket.id,
            price: ticket.price
        }
    };

    // fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, ticket, data, msg }
};