# Incident Management App

Workflow:

- `client` Front-end app for Incident Management App.
- `server` Server app for Incident Management App.

## Running Incident Management App

In order to run the demo I highly recommend installing lerna globally via

```bash
npm i -g lerna
```

Then,

```bash
lerna bootstrap
```

Run the command above at the root of your project. This command will make sure you have dependencies you need in order to run this project.

Finally,

```bash
npm run dev
```

## Deploy Docker Images

for run all docker images

> `npm run deploy`

Lerna will start all your projects parallelly and open your browser.

- http://localhost:3000/ (Client)
- http://localhost:9000/ (Server)

