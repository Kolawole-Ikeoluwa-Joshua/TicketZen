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
