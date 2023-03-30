# IO
This example shows how to use the Juggler to mock the service to invoke if you need to send messages on IO.

## Prerequisites
Make sure to have built the Docker image. Otherwise, follow the instructions in the [README](../../../README.md#build-the-container-image) file.

## Run the container
To run the container, execute the following command:

``` sh
docker run -p 3000:3000 -e OPENAPI_URL=https://raw.githubusercontent.com/pagopa/io-functions-services/50a116f/openapi/index.yaml io-mock
```
Note that the `OPENAPI_URL` environment variable is used to specify the URL of the OpenAPI file to use; the `io-mock` value
is the name of the container.  
The command above will start a container and map port 3000 in the container to port 3000 on your local machine.

## Interact with the Juggler
After the container has started, you can invoke the Juggler as it was a real service. For example, you can use the following
command to invoke the `POST /profiles` endpoint to search for a user with a given tax code:

``` sh
curl -X 'POST' \
  'http://0.0.0.0:3000/api/v1/profiles' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "fiscal_code": "<FISCAL_CODE>"
}'
```
