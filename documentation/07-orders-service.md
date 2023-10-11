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
