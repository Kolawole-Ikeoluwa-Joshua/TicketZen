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
docker push <docker_id>/auth
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

### Setup Ingress-Nginx Controller

Inspect config file:
https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

```
// deploy in cluster
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
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

## Integrating a Server-Side-Rendered React App

Set up a React App using the following process:

```
//create directory
mkdir client

// generate package.json
npm init -y

// install dependencies
npm install react react-dom next

// start up Next Project
Note: add start up script in pacakage.json
npm run dev

//install bootstrap
npm install bootstrap

// install axios
npm install axios
```

Dockerize Next App:

```
docker build -t <docker_id>/client .
docker push <docker_id>/client
```

K8s Research - Cross Namespace Service Communication:

```
kubectl get namespace
kubectl get services

kubectl get services -n ingress-nginx
```

## Code Sharing and Resuse between Services

1. Create public NPM organization

2. Publish NPM Modules

```
// setup common directory and rename package.json
mkdir common
npm init -y

// create a new git repo for common and commit changes
cd common
git init, git add, git commit

// login to NPM
npm login

// publish to NPM organization
npm publish --access public

```

3. Set up tooling for common module

```
// generate typescript config file
tsc --init

// install dev dependencies
npm install typescript del-cli --save-dev

// update tsconfig & package.json for typescript to javascript transpiling

package.json:
"scripts": {
    "clean": "del-cli ./build/*",
    "build": "tsc"
},

tsconfig:
"declaration": true,
"outDir": "./build",

// addtional configs:
  "types": "./build/index.d.ts",
  "files": [
    "build/**/*"
],

// version changes to common module
npm version patch

// build module and publish
npm run build
npm publish
```

4. Set up easy publish script - just for this project usecase

NOTE: Not ideal in a real-world project, just to speed up package publishing process in this project

```
/* custom publish script
 "scripts": {
    "clean": "del-cli ./build/*",
    "build": "npm run clean && tsc",
    "pub": "git add . && git commit -m \"Updates\" && npm version patch && npm run build && npm publish"
  }
*/

// publish module
npm run pub
```

5. Relocate shared code

moving shared codes from auth service:

```
// move middlewares and errors into common's src directory

// export modules into common's index.ts

// install dependencies in common directory
npm install express express-validator cookie-session jsonwebtoken @types/cookie-session @types/express @types/jsonwebtoken

// publish common module
npm run pub
```

6. Updating auth service

```
// navigate to the auth directory and install common module
npm install @scar-tickets/common

// update import statements in auth's src
```

7. Updating common module

```
// make changes
// build module
npm run pub

// update auth dependency
npm update @scar-tickets/common

// you can verify the auth container is running latest common module
// by locating the pacakage.json in the container
kubectl exec -it <auth-container-id> sh
```

## Event Bus Implementation (NATS Streaming Server)

Documentations:

- [NATS](https://docs.nats.io/running-a-nats-service/introduction)
- [NATS on DockerHub](https://hub.docker.com/_/nats-streaming)
