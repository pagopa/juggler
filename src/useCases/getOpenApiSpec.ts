import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import SwaggerParser from '@apidevtools/swagger-parser';
import * as E from 'fp-ts/Either';
import { isOpenAPIV2 } from '@pagopa/openapi-codegen-ts/dist/commands/gen-api-models/parse.v2';
import { Config } from '../config';

export const getOpenApiSpec =
  ({ hostname, port }: Config['server']) =>
  (openApiURL: string) =>
    pipe(
      TE.tryCatch(() => SwaggerParser.validate(openApiURL), E.toError),
      TE.map((openapi) => {
        // TODO: we should change the baseURL coming from the OpenAPI spec. We want them to have the Juggler's baseUrl.
        // FIXME: Continue here
        if (isOpenAPIV2(openapi)) {
          return {
            ...openapi,
            basePath: `http://${hostname}:${port}`,
          };
        } else {
          return {
            ...openapi,
            servers: [
              {
                description: 'juggler',
                url: `http://${hostname}:${port}`,
              },
            ],
          };
        }
      })
    );
