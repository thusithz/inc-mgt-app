# INC

## Prerequisites

`Nodejs`, `docker`

## Dev Commands

To serve development server

> `npm run dev` or `npm run deploy` with docker instance

## Deployment Steps

To dockerizing and bundling packages

> `npm run deploy`

## Environment Variables

> `.env` has default environment variables
> docker `--build-arg STAGE` determins where to get the deployment config from. Environment variables in `.env.${STAGE}` will overwrite default environment variables
> You may create an additional `/.env.development` at project root to overwrite some environment variables when running locally in dev mode. This file should not be commited to repo

## Build

To bundling packages

> `npm run build`

## Folder Structure

> `pages`
> For maintaing page containers, route names will be same as page components name, that is acting as main container for each routes

> `components`
> To keep shared compoents among few components and which can contain business logic to expose to other components

> `ui-compoents`
> To keep basic ui element which are importing from material ui and that can be extends with theming and the brandings
