import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import SwaggerParser from '@apidevtools/swagger-parser';
import * as E from 'fp-ts/Either';
import { OpenAPIParser } from '../../domain/OpenAPISpec';
import { Config } from '../../config';

const makeJugglerBasePath = (hostname: string, port: number): string =>
  `${hostname}:${port}`;

export const makeOpenAPIParser = ({
  hostname,
  port,
}: Config['server']): OpenAPIParser => ({
  parse: (url) =>
    pipe(
      TE.tryCatch(() => SwaggerParser.validate(url), E.toError),
      TE.map((openapi) => {
        makeJugglerBasePath(hostname, port);
        return openapi;
      })
    ),
});
