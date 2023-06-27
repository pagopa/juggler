import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import SwaggerParser from '@apidevtools/swagger-parser';
import * as E from 'fp-ts/Either';
import { OpenAPIParser } from '../../domain/OpenAPISpec';

export const makeOpenAPIParser = (): OpenAPIParser => ({
  parse: (url) =>
    pipe(
      TE.tryCatch(() => SwaggerParser.validate(url), E.toError),
      TE.map(
        (openapi) =>
          // TODO: we should change the baseURL coming from the OpenAPI spec. We want them to have the Juggler's baseUrl.
          // FIXME: Continue here
          openapi
      )
    ),
});
