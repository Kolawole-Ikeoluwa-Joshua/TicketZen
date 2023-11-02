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

