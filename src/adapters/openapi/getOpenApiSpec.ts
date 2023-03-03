import fs from 'fs';
import * as TE from 'fp-ts/lib/TaskEither';
import { flow, pipe } from 'fp-ts/lib/function';
import SwaggerParser from '@apidevtools/swagger-parser';
import { FetchedContent } from '../../domain/FetchedContent';

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

const readSpecFromFile = (path: string): TE.TaskEither<Error, FetchedContent> =>
  pipe(
    TE.tryCatch(
      () => fs.promises.readFile(path, 'utf8'),
      (_) => new Error('Something went wrong!')
    ),
    TE.map((content) => ({ content, fromOrigin: false }))
  );

/**
 * Fetch the OpenAPI specification from the specified URL.
 * If the URL is not valid, or doesn't point to a valid OpenAPI specification,
 * then the bundled OpenAPI specification returned are the specifications that belong
 * to the Juggler.
 *
 * @param url The URL of the OpenAPI specification
 * @returns A {@link TE.TaskEither} containing on the left an {@link Error} if the URL is not valid,
 * or on the right the bundled OpenAPI specification (as {@link FetchedContent}).
 */
export const fetchOpenApiContent = (
  url: string
): TE.TaskEither<Error, FetchedContent> =>
  pipe(
    tryToBundleOpenApi(url),
    TE.orElse(() => readSpecFromFile('docs/openapi/juggler.yaml'))
  );
