# The Juggler

> :warning: **This project is still a WIP and may change drastically**: Be very careful here!

Are you looking for a quick way to mock some endpoints given an open API? The Juggler can do what you are looking for.

## How to run it

Install all the dependencies with the following command:

``` sh
npm install
```

Then, generate the Juggler code from its OpenAPI with the following command:

``` sh
npm run generate:api
```

To spin up the mock just run the following command:

``` sh
npm run start
```

You can access the dashboard by visiting the path `/ui/dashboard`.

If you want to take a look at an HTML version of the OpenAPI, you can visit the path `/ui/openapi`.

## Build the container image

> Prerequisite:
> * Have [Docker](https://www.docker.com/get-started) or equivalent software (e.g. [podman](https://podman.io/)) installed.

To build the container image, follow these steps:

Build the container image using the `Dockerfile` included in the project directory:

``` sh
# docker
docker build -t your-image-name .

# podman
podman build -t your-image-name .
```

This command will create a new Docker image with the specified name (`your-image-name`) and tag (`latest` by default) based on the Dockerfile.

Once the image has been built, you can run it using the run command:

``` sh
# docker
docker run -p 8080:3000 -e OPENAPI_URL=https://<path-to-openapi> your-image-name

# podman
podman run -p 8080:3000 -e OPENAPI_URL=https://<path-to-openapi> your-image-name
```

This command will start a new container based on the image you just built and map port 3000 in the container to port 8080 on your local machine. You should now be able to access the project by visiting http://localhost:8080 in your web browser.

## Examples
You can find some examples [here](./docs/examples/README.md).
