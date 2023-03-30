# Examples
Here you can find some examples of how to use the Juggler to mock your APIs.

## Prerequisites
Make sure to have built the Docker image. Otherwise, follow the instructions in the [README](../../README.md#build-the-container-image) file.  
Once you have built the image, just get the URL of the OpenAPI file you want to use to mock your APIs.

## Run the container
To run the container, execute the following command:

``` sh
docker run -p 3000:3000 -e OPENAPI_URL=<URL_HERE> your-image-name
```
or using Podman:

``` sh
podman run -p 3000:3000 -e OPENAPI_URL=<URL_HERE> your-image-name 
```

**E.g.**: to run the Juggler in order to mock the IO APIs, run the following command:

``` sh
docker run -p 3000:3000 -e OPENAPI_URL=https://raw.githubusercontent.com/pagopa/io-functions-services/50a116f/openapi/index.yaml your-image-name
```

Note that the `OPENAPI_URL` environment variable is used to specify the URL of the OpenAPI file to use.
The command above will start a container and map port 3000 in the container to port 3000 on your local machine.

Once you have started the container, you can see the list of all the endpoints available, visiting the OpenAPI specification at `/ui/openapi`.
If you need to see the recorded requests and responses, just go to `/ui/dashboard`.

### IO
[Here](https://raw.githubusercontent.com/pagopa/io-functions-services/50a116f/openapi/index.yaml) you can find the OpenAPI specification.  

To search a profile, you can use the following command to invoke the `POST /profiles` endpoint to search for a user with a given `fiscal_code`:

``` sh
curl -X 'POST' \
  'http://0.0.0.0:3000/profiles' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "fiscal_code": "<FISCAL_CODE>"
}'
```
