import { Publisher, Subjects, TicketUpdatedEvent } from '@scar-tickets/common';
// simple publisher to emit tickets events
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}