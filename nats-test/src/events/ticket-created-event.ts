import { Subjects } from './subjects';

// custom Event Interface
export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}

