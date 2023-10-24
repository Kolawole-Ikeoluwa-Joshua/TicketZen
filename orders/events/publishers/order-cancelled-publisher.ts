import { Publisher, OrderCancelledEvent, Subjects } from '@scar-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}