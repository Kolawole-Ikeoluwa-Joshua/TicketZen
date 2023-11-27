import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { Order } from "../../../models/order";
import { OrderStatus, ExpirationCompleteEvent } from "@scar-tickets/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'fhfisia',
        price: 20
    });
    await ticket.save();
    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'dhjsfhhfsi',
        expiresAt: new Date(),
        ticket,
    });
    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return { listener, order, ticket, data, msg };
};