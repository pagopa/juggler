# The Juggler

> **Warning**
> **This project is still a WIP and may change drastically**

Are you looking for a quick way to mock some endpoints given an open API? The Juggler can do what you are looking for.

## Requirements

- [Node.js](https://nodejs.org/docs/latest-v18.x/api/index.html)
- [npm CLI](https://docs.npmjs.com/cli/v9)
- [Optional] [Docker](https://www.docker.com/get-started) or equivalent software (e.g. [podman](https://podman.io/)).

## Local development

Before you start, make sure you have complete the following steps:
- Install the dependencies: `npm install`.
- [Optional] Create a `.env.local` starting from `.env.default` and change the values.
  - Otherwise the system will use `.env.default`.

### Run the Juggler locally

Run the following command from the root folder.

``` bash
npm run dev
```

Open [http://localhost:3000/ui/dashboard](http://localhost:3000/ui/dashboard) with your browser to see the dashboard.

Open [http://localhost:3000/ui/openapi](http://localhost:3000/ui/openapi) with your browser to see the open-api documentation.

### Useful commands

Generate required code from internal open-api definition:

``` sh
npm run generate:api
```

Checks the types

``` sh
npm run compile
```

Code linting and formatting

``` sh
npm run lint

# this command fixes fixable errors
npm run lint -- --fix

npm run format
```

### Build and run the container image locally

Run the following commands from the root folder.

``` sh
# docker
docker build -t your-image-name .
```

Once the image has been built, you can run it using the run command:

``` sh
# docker
docker run -p 3000:3000 -e OPENAPI_URL=https://<path-to-openapi> your-image-name
```

## Run as docker image taken from registry

``` sh
docker run -p 3000:3000 -e OPENAPI_URL=path-to-your-openapi ghcr.io/pagopa/juggler:latest
```

## Examples
You can find some examples on [./docs/examples/README.md](./docs/examples/README.md) file.

## Changelog

To generate the changelog, we are using [changesets](https://github.com/changesets/changesets).  
When you want to add some information you want to show into the changelog, you can run `npx changeset` or `npm run changeset`
and follow the wizard: changeset will ask you what kind of changes you made (major, minor, patch) and also a summary; 
the text you enter in the summary is what will be visible into the CHANGELOG file.

The repository has enabled the changeset GitHub app, which helps to better handle changelogs. 
