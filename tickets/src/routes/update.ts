import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError
} from '@scar-tickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket) {
        throw new NotFoundError();
    }

    // currentUser already defined in requireAuth middleware
    if (ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    res.send(ticket);
});

export { router as updateTicketRouter };