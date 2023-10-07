# Event Bus Implementation (NATS Streaming Server)

Documentations:

- [NATS](https://docs.nats.io/running-a-nats-service/introduction)
- [NATS on DockerHub](https://hub.docker.com/_/nats-streaming)
- [node-nats-streaming](https://www.npmjs.com/package/node-nats-streaming)

### Building a NATS Test Project:

Set up directory and install dependencies:

```
npm install node-nats-streaming ts-node-dev typescript @types/node

tsc --init
```

Port-Forwarding to allow traffic to NATS

```
// retrieve NATS pod id
kubectl get pods

// port-forwarding with kubectl
kubectl port-forward <nats-id>  4222:4222

// in another terminal window, test NATS connection
npm run publish

// debugging missing messages
kubectl port-forward <nats-id>  8222:8222

on broswer: http://localhost:8222/streaming/

```

##### Update Common Module with Event Definitions

Setup an `events` directory with Event Definitions to be used across Services built with Typescript in common(src).
Note: Install dependencies

```
npm install node-nats-streaming
```

Publish common module to npm registry.

```
npm run pub
```

In tickets service, update common module used

```
npm update @scar-tickets/common
```

Restart NATS pod to dump all test events emitted during development.

```
kubectl delete pod <pod-id>
```
