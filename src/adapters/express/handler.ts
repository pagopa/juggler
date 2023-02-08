/**
 * This file provides the {@link express.Handler} that handles the mock capability.
 */
import express from 'express';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as RR from 'fp-ts/lib/ReadonlyRecord';
import { Mock, MockRequest } from '../../domain/Mock';

// Following the structure defined by RFC7807 (https://www.rfc-editor.org/rfc/rfc7807#section-3.1)
const problemDetail500 = {
  status: 500,
  title: 'Something really bad happened.',
  detail: "I don't have any detail at the moment.",
};

export const makeMethod = (
  method: express.Request['method']
): MockRequest['method'] => {
  switch (method) {
    case 'DELETE':
      return 'delete';
    case 'GET':
      return 'get';
    case 'HEAD':
      return 'head';
    case 'OPTIONS':
      return 'options';
    case 'PATCH':
      return 'patch';
    case 'POST':
      return 'post';
    case 'PUT':
      return 'put';
    default:
      return 'trace';
  }
};

const makeHeaders = (
  headers: express.Request['headers']
): MockRequest['headers'] =>
  pipe(
    headers,
    RR.filterMap(O.fromNullable),
    RR.map((value) => (Array.isArray(value) ? value.join(', ') : value))
  );

/**
 * Transform an {@link express.Request} to a {@link MockRequest}.
 * @internal
 */
export const makeMockRequestFromExpressRequest = (
  request: express.Request
): MockRequest => ({
  url: {
    path: request.path,
  },
  method: makeMethod(request.method),
  headers: makeHeaders(request.headers),
  body: request.body,
});

/**
 * Create the {@link express.Handler} that manages the mock capability.
 */
export const makeHandler =
  (mock: Mock) =>
  (req: express.Request, res: express.Response): Promise<express.Response> =>
    pipe(
      mock.generateResponse(makeMockRequestFromExpressRequest(req)),
      TE.fold(
        (_) => T.of(res.status(500).json(problemDetail500)),
        ({ status, headers, data }) =>
          T.of(res.status(status).header(headers).send(data))
      )
    )();
