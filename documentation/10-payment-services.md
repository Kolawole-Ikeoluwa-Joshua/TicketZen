# Handling Payments

Payment service:
Receiving:

- order:created: Payments service needs to know there is a new order that a user might submit a payment for
- order:cancelled: Payments should know that any incoming payments for this order should be rejected
  Emitting:
- charge:created: Orders service needs to know that an order has been paid for

## Initial setup:

1. Create `payments` directory with the following base configurations files and source code files:

```
src/__mocks__/nats-wrapper.ts
src/app.ts
src/index.ts
src/nats-wrapper.ts
src/test/setup.ts
Dockerfile
package.json
tsconfig.json
```

2. Build docker image and push to container registry

```
docker build -t <docker-id>/payments .

docker push <docker-id>/payments
```

3. Setup K8s Deployment manifests

```
1. update skaffold.yaml with payments service configuration.
2. create payment service deployment (app and service) manifest.
3. create payment service database deployment manifest.
4. start up skaffold
```

## Database Models:

These are the properties needed for orders model in the payments service:

```
id, status, version, userid, price
```

## Replicating Orders

create event listener for `order:created` events.
create event listener for `order:cancelled` events.

## Implementing Charge Handler

This workflow will be achieved by integrating Stripe JS library into the payments service <br>

so we can utilize the Stripe API to handle credit card info & payments.

### Setup Stripe SDK

```
npm install stripe
```

sign up on stripe to get an API Key

### Create K8s secret for Stripe API Secret Key

```
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<stripe-secret-key>
```

verify secret created above:

```
kubectl get secrets
```

### Manually Testing Payments

Use stripe fake token `tok_visa` for stripe accounts in test mode when making the api request <br>
to the payments route with postman.

### Realistic Test Implementation

Instead of creating an automated test that uses a mocked stripe client, we can allow our automated test <br>
to contact the stripe API directly.

Note: Store your stripe API key in an environment variable
