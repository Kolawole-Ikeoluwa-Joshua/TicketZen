# Worker Service (Expiration Service)

Watch for `order:created` events, and start a 15 minutes timer to eventually time out this order.

When timer is completed, publish an `expiration:complete` event.

expiration:complete:

- orders service needs to know that an order has gone over the 15 minutes time limit. The order sevice decideds whether or not to cancel the order (depending on if order has been paid for).

## Expiration Service Components:

- Listener for `order:created` events
- Bull JS library to send notifications or reminders in 15 minutes intervals
- Redis server to store notifications & notify Bull JS once timer is reached
- Publisher to emit `expiration:complete` events

## Initial setup

Setup tsconfig, package.json, dockerfile, .dockerignore, nats-wrapper and index.ts for expiration service

```
# install Bull JS library
npm install bull @types/bull

# other dependencies in package.json
npm install
```

## K8s setup

Build expiration docker container and push to container registry

```
docker build -t <docker-id>/expiration .

docker push <docker-id>/expiration
```

Setup exipration and redis deployment manifests, update skaffold config & start up skaffold

```
skaffold dev
```
