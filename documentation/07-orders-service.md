# Orders Service

This service works with the tickets service, so we implement cross-service data replication

### Scaffolding the Orders Service:

- Duplicate the 'tickets' service
- Install dependencies
- Build an image out of the orders service
- Create K8s deployement manifest
- Set up file sync options in the skaffold.yaml file
- Set up routing rules in the Ingress Service

### Routes

Setup the following routes:

- index ==> GET (/api/orders)
- show ==> GET (/api/orders/:id)
- new ==> POST (/api/orders)
- delete ==> DELETE (/api/orders/:id)

### Order Model

Setup an implementation for Order Model which will use Mongoose Ref/Population Feature to associate Orders & Tickets

### Orders service test suite

Setup testing suite similar to implementation used in tickets service, refactor code to orders usecase:

- `test/setup.ts`
- `__mocks__/nats-wrapper.ts`

Verify test suite setup:

```
npm run test
```

Output:

```
No tests found, exiting with code 0

Watch Usage: Press w to show more.
```

### Create Orders Events

Add order events (OrderCreatedEvent & OrderCancelledEvent) into the `src` folder in the Common module.

In common directory, publish the NPM package with script previously setup.

```
npm run pub
```

In Orders directory, update common module.

```
npm update @scar-tickets/common
```

### Implement Publisher

Create `publishers` for OrderCreatedEvent & OrderCancelledEvent.
