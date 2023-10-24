import { Publisher, OrderCreatedEvent, Subjects } from '@scar-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}