# TicketZen

### Auth Service Setup

Setup `package.json`` manifest

```
npm init -y
```

Install the following modules

```
npm install typescript ts-node-dev express @types/express
```

Setup `tsconfig.json` manifest

```
tsc --init
```

Dockerize the auth service using its `Dockerfile`.

```
docker build -t <docker_id>/auth .
```
