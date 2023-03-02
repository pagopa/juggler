import fs from 'fs';
import * as TE from 'fp-ts/TaskEither';
import { flow, pipe } from 'fp-ts/lib/function';
import SwaggerParser from '@apidevtools/swagger-parser';
import * as T from 'fp-ts/Task';

type FetchedContent = {
  content: string;
  fromOrigin: boolean;
};

const tryToBundleOpenApi = (
  url: string
): TE.TaskEither<Error, FetchedContent> =>
  pipe(
    TE.tryCatch(
      () => SwaggerParser.bundle(url),
      (_) =>
        new Error(`It wasn't possible to parse the OpenAPI specified at ${url}`)
    ),
    TE.map(
      flow(JSON.stringify, (spec) => ({ content: spec, fromOrigin: true }))
    )
  );

export const fetchOpenApiContent = (url: string) =>
  pipe(
    tryToBundleOpenApi(url),
    TE.getOrElse(() =>
      T.of({
        content: fs.readFileSync('docs/openapi/juggler.yaml', 'utf8'),
        fromOrigin: false,
      })
    )
  );
