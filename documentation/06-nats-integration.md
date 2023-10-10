# Managing a NATS Client (NATS Integration):

### Managing a NATS Client

In `tickets/src/events/publisher`, create a simple publisher to emit tickets events to NATS.

Import publisher into `new.ts` route handler to create a ticket, and publish an event.

Setup, node nats streaming in the tickets service.

```
npm install node-nats-streaming
```

### NATS Singleton Implementation

Create a class that initializes a client from nats library, export instance of the class to initialze a client in `index.ts`,
and access client in `new.ts` route handler. Test ticket created and updated publishing.

### Special Case Not Implemented In Project:

How to handle publish failures, in case NATS connection is lost:

- Save transactions & events into DB at the same time
- Seperate process watching events records, polls & sends events to NATS
- Use DB Transaction to implement saving both (transactions & events successfully)

### Fixing Unit Tests:

We need Jest to implement a Mock NatsWrapper which will Fake an inititalized NATS CLient. This can then be used in our test suites.
