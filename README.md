# TicketZen

## Auth Service Setup

Setup `package.json`` manifest

```
npm init -y
```

Install the following modules

```
npm install typescript ts-node-dev express @types/express

npm install express-validator

// handling errors in asynchronous requests
npm install express-async-errors


// setup mongodb object modeling tool
npm install mongoose
npm install @types/mongoose


// add cookie sessions support
// install cookie-session library type definition file as well
npm install cookie-session @types/cookie-session

// add json web token
npm install jsonwebtoken @types/jsonwebtoken
```

Setup `tsconfig.json` manifest

```
tsc --init
```

Dockerize the auth service using its `Dockerfile`.

```
docker build -t <docker_id>/auth .
```

Setup Skaffold manifest to automate development workflow in K8s.
Start skaffold by running this in the root directory

```
skaffold dev
```

Setup dummy domain used in ingress-nginx manifest for development purpose, in your local host file.
Edit the following host files with admin privileges:

```
Mac/Linux => /etc/hosts

Windows => C:\Windows\System32\Drivers\etc\hosts
```

After editing try accessing the test path in your browser.

Note: Type the following command while on your browser screen to bypass chrome connection error:

```
thisisunsafe
```

### Database Setup

Setup `auth-mongo-depl` manifest

```
docker pull mongo

skaffold dev
```

### Secure JWT Signing Keys in k8s

Creating a Secret using an imperative command:

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

kubectl get secrets
```

### Testing Isolated Microservices

Install the following test libraries for Auth service:

```
npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server
```

Ensure your docker images are not built with these test dev-dependencies by editing `RUN npm install --omit=dev` in Auth service Dockerfile.

Run tests in service directory using this command:

```
npm run test
```
