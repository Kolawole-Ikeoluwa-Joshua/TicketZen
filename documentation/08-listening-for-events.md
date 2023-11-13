# Listening for Events and Handling Concurrency Issues

- Implement ticket:created & ticket:updated listeners in the orders service
- Implement order:created & order:cancelled listeners in the tickets service

After setting up publisher & listener infrastructure we can do a manual test on our tickets endpoint.

Using postman make POST request to create a ticket, PUT request to update the ticket, you should see the console log from skaffold:

```
[orders] Connected to NATS
[orders] Connnected to MongoDB
[orders] Listening on port 5000!!!
[tickets] Connected to NATS
[tickets] Connnected to MongoDB
[tickets] Listening on port 5000!!!
[tickets] Event published to subject ticket:created
[orders] Message received: ticket:created / orders-service
[tickets] Event published to subject ticket:updated
[orders] Message received: ticket:updated / orders-service
```

## Optimistic Concurrency Control

We use mongoose and mongodb to version database records as a way to fix concurrency issues.

```
# install npm module for optimistic concurrency control on mongoose

# in the tickets service
cd tickets or cd orders

npm install mongoose-update-if-current
```

Include `version: number` in order and ticket events in the common module and update common module version
used in order and ticket services.

After above requirement is completed then we can proceed to updating Event Definitions in Ticket & Orders services.

## Listeners in Orders Service

Create `ticket-created-listener` & `ticket-updated-listener` in Orders service.

ticket-created-listener:

- orders needs to know the valid tickets that can be purchased
- orders needs to know the price of each ticket

ticket-updated-listener:

- orders service needs to know when the price of a ticket has changed
- orders service needs to know when a ticket has successfully been reserved

### Test Event listeners in Orders Service

Create unit tests for `ticket-created-listener` & `ticket-updated-listener` in Orders service.

## Listeners in Tickets Service

Create `order-created-listener` & `order-cancelled-listener` in Tickets service.

order-created-listener:

- tickets service needs to be told that one of its tickets has been reserved<br>, and no further edits to that ticket should be allowed

order-cancelled-listener:

- tickets service should unreserve a ticket if the corresponding order has been cancelled so this ticket can be edited again
