import { Subjects } from './subjects';

// custom Event Interface
export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        version: number;
        title: string;
        price: number;
        userId: string;
    };
}

