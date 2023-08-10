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

Note that the `OPENAPI_URL` environment variable is used to specify the URL of the OpenAPI file to use.
The command above will start a container and map port 3000 in the container to port 3000 on your local machine.

Once you have started the container, you can see the list of all the endpoints available, visiting the OpenAPI specification at `/ui/openapi`.
If you need to see the recorded requests and responses, just go to `/ui/dashboard`.

### IO
[Get the IO OpenAPI specification](https://raw.githubusercontent.com/pagopa/io-functions-services/50a116f/openapi/index.yaml).

Run the Juggler with the following command:
``` sh
docker run -p 3000:3000 -e OPENAPI_URL=https://raw.githubusercontent.com/pagopa/io-functions-services/50a116f/openapi/index.yaml ghcr.io/pagopa/juggler:latest
```

To search a profile, you can use the following command to invoke the `POST /profiles` endpoint to search for a user with a given `fiscal_code`:

``` sh
curl -X 'POST' \
  'http://0.0.0.0:3000/profiles' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "fiscal_code": "<FISCAL_CODE>"
}'
```

### Piattaforma Notifiche
Piattaforma Notifiche provides two different OpenAPIs: one to use in order to send a digital notification and one to use 
in order to see the status (and events related) of the notifications sent.

[Get the Piattaforma Notifiche OpenAPI specification](https://github.com/pagopa/pn-delivery/raw/d499410/docs/openapi/api-external-b2b-pa-v1.yaml).

Run the Juggler with the following command:
``` sh
docker run -p 3000:3000 -e OPENAPI_URL=https://github.com/pagopa/pn-delivery/raw/d499410/docs/openapi/api-external-b2b-pa-v1.yaml ghcr.io/pagopa/juggler:latest
```

You can then run the following command:
``` sh
curl --location 'http://0.0.0.0:3000/delivery/attachments/preload' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'x-api-key: key-value' \
  -d '[
    {
      "preloadIdx": "documento",
      "contentType": "application/pdf",
      "sha256": "Fq9Vn4gAxHvvcaS0P6DGZOJ0/HjoViGOYwV7Hk7BRlM="
    }
  ]'
```

If you need to mock the API to get the status of the notifications, [this](https://github.com/pagopa/pn-delivery-push/raw/a886f32/docs/openapi/api-external-b2b-webhook-v1.yaml) 
the OpenAPI specification you need and then you can run the following commands:

``` sh
# Start the Juggler container
docker run -p 3000:3000 -e OPENAPI_URL=https://github.com/pagopa/pn-delivery-push/raw/a886f32/docs/openapi/api-external-b2b-webhook-v1.yaml ghcr.io/pagopa/juggler:latest

# Get the streams
curl -X 'GET' \
  'http://0.0.0.0:3000/delivery-progresses/streams' \
  -H 'Accept: application/json'
```

### IO Sign - Firma con IO
[Get the IO Sign OpenAPI specification](https://raw.githubusercontent.com/pagopa/io-sign/main/apps/io-func-sign-issuer/openapi.yaml).

Run the Juggler with the following command:
``` sh
docker run -p 3000:3000 -e OPENAPI_URL=https://raw.githubusercontent.com/pagopa/io-sign/main/apps/io-func-sign-issuer/openapi.yaml ghcr.io/pagopa/juggler:latest
```
Then, you can use this command to create a new dossier using the `POST /dossiers` endpoint:

``` sh
curl -X 'POST' \
  'http://0.0.0.0:3000/dossiers' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "string",
  "documents_metadata": [
    {
      "title": "string",
      "signature_fields": [
        {
          "attrs": {
            "unique_name": "string"
          },
          "clause": {
            "title": "string",
            "type": "REQUIRED"
          }
        }
      ]
    }
  ]
}'
```

### Centro Stella - IdPay
[Get the IdPay OpenAPI specification](https://raw.githubusercontent.com/pagopa/cstar-infrastructure/ad538ca81f397f4804b2e6ea15d3b03c89260e4f/src/domains/idpay-app/api/idpay_appio_full/openapi.appio.full.yml).

Run the Juggler with the following command:
``` sh
docker run -p 3000:3000 -e OPENAPI_URL=https://raw.githubusercontent.com/pagopa/cstar-infrastructure/ad538ca81f397f4804b2e6ea15d3b03c89260e4f/src/domains/idpay-app/api/idpay_appio_full/openapi.appio.full.yml ghcr.io/pagopa/juggler:latest
```
Then, you can use this command to get the list of IBANs using the `GET /iban/` endpoint:

``` sh
curl -X 'GET' \
  'http://0.0.0.0:3000/iban/' \
  -H 'accept: application/json' \
  -H 'Accept-Language: it-IT'
```
