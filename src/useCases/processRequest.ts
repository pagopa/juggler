/**
 * This file the use case that process a request.
 */
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as RA from 'fp-ts/ReadonlyArray';
import * as O from 'fp-ts/Option';
import * as R from 'fp-ts/Reader';
import { Capabilities } from '../domain/Capabilities';
import { HttpRequest } from '../domain/RequestResponse';

/**
 * This function is the entry point for processing an HTTP request. Its goal is
 * to deliver a dummy answer to the specified HTTP request.
 */
export const processRequest = (request: HttpRequest) =>
  pipe(
    R.ask<
      Pick<
        Capabilities,
        'mock' | 'requestResponseWriter' | 'listCustomResponseDefinition'
      >
    >(),
    R.map(({ mock, requestResponseWriter, listCustomResponseDefinition }) =>
      pipe(
        listCustomResponseDefinition(),
        RA.findFirst(({ match }) => match === request),
        O.fold(
          () => mock.generateResponse(request),
          ({ response }) => TE.of(response)
        ),
        TE.map((response) => ({ request, response })),
        TE.chain(requestResponseWriter.record),
        TE.map(({ response }) => response)
      )
    )
  );
