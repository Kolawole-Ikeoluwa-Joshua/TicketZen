import { Listener, OrderCancelledEvent, Subjects } from "@scar-tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        // find ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        // if no ticket, throw error
        if(!ticket) {
            throw new Error('Ticket not found');
        }

        // mark ticket as unreserved by setting orderId property to undefined
        ticket.set({ orderId: undefined });

        // save the ticket
        await ticket.save();

        // publish an event
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            userId: ticket.userId,
            price: ticket.price,
            title: ticket.title,
            version: ticket.version
        });

        // ack the message
        msg.ack();
    }
}