import { Subjects } from './subjects';

// custom Event Interface
export interface TickedCreatedEvent {
    subject: Subjects.TickedCreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}

