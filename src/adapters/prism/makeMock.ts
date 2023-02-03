/**
 * This file provides the implementation of {@link Mock} using Prism.
 */
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';
import { getHttpOperationsFromSpec } from '@stoplight/prism-cli/dist/operations';
import {
  createClientFromOperations,
  PrismHttp,
} from '@stoplight/prism-http/dist/client';
import { Mock } from '../../domain/Mock';

/**
 * Create a PrismHttp instance given a reference to an Open-API specification.
 * @internal
 */
export const makePrismHttp = (
  openapi: string
): TE.TaskEither<Error, PrismHttp> =>
  pipe(
    TE.tryCatch(() => getHttpOperationsFromSpec(openapi), E.toError),
    TE.map((operations) =>
      createClientFromOperations(operations, {
        mock: { dynamic: true },
        validateRequest: true,
        validateResponse: true,
        checkSecurity: false,
        errors: true,
        upstreamProxy: undefined,
      })
    )
  );

/**
 * Given a PrismHttp instance, create a Mock instance.
 * @internal
 */
export const makeMockFromPrismHttp = (prismHttp: PrismHttp): Mock => ({
  generateResponse: (req) =>
    TE.tryCatch(() => prismHttp.request(req.url.path, req), E.toError),
});

/**
 * Given a reference to an Open-API specification, parse it and create an instance of  {@link Mock}.
 */
export const makeMock = (openapi: string): TE.TaskEither<Error, Mock> =>
  pipe(makePrismHttp(openapi), TE.map(makeMockFromPrismHttp));
