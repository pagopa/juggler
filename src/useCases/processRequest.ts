/**
 * This file the use case that process a request.
 */
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as R from 'fp-ts/Reader';
import { Capabilities } from '../domain/Capabilities';
import { HttpRequest } from '../domain/RequestResponse';

/**
 * Process the given request
 */
export const processRequest = (request: HttpRequest) =>
  pipe(
    R.ask<Pick<Capabilities, 'mock' | 'requestResponseWriter'>>(),
    R.map(({ mock, requestResponseWriter }) =>
      pipe(
        mock.generateResponse(request),
        TE.map((response) => ({ request, response })),
        TE.chain(requestResponseWriter.record),
        TE.map(({ response }) => response)
      )
    )
  );
