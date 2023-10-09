import { Publisher, Subjects, TicketCreatedEvent } from '@scar-tickets/common';
// simple publisher to emit tickets events
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}