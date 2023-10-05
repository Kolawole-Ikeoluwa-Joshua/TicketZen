import { Publisher, Subjects, TicketCreatedEvent } from '@scar-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}