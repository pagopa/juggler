/**
 * This file the use case that process a request.
 */
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as R from 'fp-ts/Reader';
import { Capabilities } from '../domain/Capabilities';
import { MockRequest } from '../domain/Mock';

/**
 * Process the given request
 */
export const processRequest = (mockRequest: MockRequest) =>
  pipe(
    R.ask<Pick<Capabilities, 'mock' | 'requestResponseWriter'>>(),
    R.map(({ mock, requestResponseWriter }) =>
      pipe(
        mock.generateResponse(mockRequest),
        TE.map((response) => ({ request: mockRequest, response })),
        TE.chain(requestResponseWriter.record),
        TE.map(({ response }) => response)
      )
    )
  );
