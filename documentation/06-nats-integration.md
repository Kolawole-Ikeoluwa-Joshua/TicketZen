# Managing a NATS Client (NATS Integration):

### Managing a NATS Client

In `tickets/src/events/publisher`, create a simple publisher to emit tickets events to NATS.

Import publisher into `new.ts` route handler to create a ticket, and publish an event.

Setup, node nats streaming in the tickets service.

```
npm install node-nats-streaming
```

NATS Singleton Implementation: Create a class that initializes a client from nats library, export instance of the class to initialze a client in `index.ts`,
and access client in `new.ts` route handler.

Test ticket created and updated publishing

