import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import SwaggerParser from '@apidevtools/swagger-parser';
import * as E from 'fp-ts/Either';
import { Config } from '../config';

export const getOpenApiSpec =
  (_serverConfig: Config['server']) => (openApiURL: string) =>
    pipe(
      TE.tryCatch(() => SwaggerParser.validate(openApiURL), E.toError),
      TE.map(
        (openapi) =>
          // TODO: we should change the baseURL coming from the OpenAPI spec. We want them to have the Juggler's baseUrl.
          // FIXME: Continue here
          openapi
      )
    );
