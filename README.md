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
