# Integrating a Server-Side-Rendered React App

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
