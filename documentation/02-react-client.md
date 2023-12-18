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

// install react-stripe-checkout
npm install react-stripe-checkout
npm install prop-types
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

# Server-Side-Rendered React App Pages:

Initially worked on setting up the `Sign up`, `Sign in` and `Sign out` pages.

A summarized list of React App Pages to be completed:

- Create Tickets page
- Tickets on sale (Landing page)
- Ticket details & purchase options page
- Order details & payment options page
- Stripe Payment page


# App Component Pages Documentation

| Route                | File in Pages Dir       | Goal                                      |
| -------------------- | ------------------------ | ------------------------------------------ |
| `/auth/signin`       | `/auth/signin.js`       | Show sign-in form                          |
| `/auth/signup`       | `/auth/signup.js`       | Show sign-up form                          |
| `/auth/signout`      | `/auth/signout.js`      | Sign out                                   |
| `/`                  | `/index.js`             | Show list of all tickets                   |
| `/tickets/new`       | `/tickets/new.js`       | Form to create a new ticket                |
| `/tickets/:ticketid` | `/tickets/[ticketid].js` | Details about a specific ticket            |
| `/orders/:orderid`   | `/orders/[orderid].js`  | Show info about an order + payment button  |
