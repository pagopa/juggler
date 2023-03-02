import fs from 'fs';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import { flow, pipe } from 'fp-ts/lib/function';
import SwaggerParser from '@apidevtools/swagger-parser';

type FetchedContent = {
  content: string;
  fromOrigin: boolean;
};

/**
 * Try to bundle the OpenAPI specification from the specified URL.
 *
 * @param url The URL of the OpenAPI specification
 * @returns The bundled OpenAPI specification (as string) if the URL is valid, or an {@link Error} otherwise.
 */
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

/**
 * Fetch the OpenAPI specification from the specified URL.
 * If the URL is not valid, or doesn't point to a valid OpenAPI specification,
 * then the bundled OpenAPI specification returned are the specifications that belong
 * to the Juggler.
 *
 * @param url The URL of the OpenAPI specification
 * @returns A {@link T.Task} containing the {@link FetchedContent}.
 */
export const fetchOpenApiContent = (url: string) =>
  pipe(
    tryToBundleOpenApi(url),
    TE.getOrElse(() =>
      T.of({
        content: fs.readFileSync('docs/openapi/juggler.yaml', 'utf8'), // TODO: Refactor using IO
        fromOrigin: false,
      })
    )
  );
