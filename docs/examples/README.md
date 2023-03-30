# IO
This example shows how to use the Juggler to mock the service to invoke if you need to send messages on IO.

## Prerequisites
Make sure to have built the Docker image. Otherwise, follow the instructions in the [README](../../../README.md#build-the-container-image) file.

## Run the container
To run the container, execute the following command:

``` sh
docker run -p 3000:3000 -e OPENAPI_URL=https://raw.githubusercontent.com/pagopa/io-functions-services/50a116f/openapi/index.yaml your-image-name
```
or using Podman:

``` sh
podman run -p 3000:3000 -e OPENAPI_URL=https://raw.githubusercontent.com/pagopa/io-functions-services/50a116f/openapi/index.yaml your-image-name 
```
Note that the `OPENAPI_URL` environment variable is used to specify the URL of the OpenAPI file to use.
The command above will start a container and map port 3000 in the container to port 3000 on your local machine.

## Interact with the Juggler
After the container has started, you can invoke the Juggler as it was a real service. For example, you can use the following
command to invoke the `POST /profiles` endpoint to search for a user with a given `fiscal_code`:

``` sh
curl -X 'POST' \
  'http://0.0.0.0:3000/profiles' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "fiscal_code": "<FISCAL_CODE>"
}'
```

You can see the list of all the endpoints available, visiting the OpenAPI specification at http://localhost:3000/ui/openapi.
You can see the recorded requests and responses at http://localhost:3000/ui/dashboard.