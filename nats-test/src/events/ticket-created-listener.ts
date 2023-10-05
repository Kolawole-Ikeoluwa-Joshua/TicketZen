import { Message } from "node-nats-streaming";
import { Listener } from './base-listener';
import { TickedCreatedEvent } from "./ticket-created-event";
import { Subjects
 } from "./subjects";
// Listener Subclass
export class TicketCreatedListener extends Listener<TickedCreatedEvent> {
    readonly subject = Subjects.TickedCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TickedCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data);


        msg.ack();
    }
}