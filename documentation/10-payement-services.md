# Handling Payments

Payment service:
Receiving:
- order:created: Payments service needs to know there is a new order that a user might submit a payment for
- order:cancelled: Payments should know that any incoming payments for this order should be rejected
Emitting:
- charge:created: Orders service needs to know that an order has been paid for