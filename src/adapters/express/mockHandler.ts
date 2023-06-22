/**
 * This file provides the {@link express.Handler} that handles the mock capability.
 */
import express from 'express';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as RR from 'fp-ts/lib/ReadonlyRecord';
import { HttpRequest } from '../../domain/RequestResponse';
import { processRequest } from '../../useCases/processRequest';
import { AppEnv } from './AppEnv';
import { problemDetail500 } from './errors';

export const makeMethod = (
  method: express.Request['method']
): HttpRequest['method'] => {
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
): HttpRequest['headers'] =>
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
): HttpRequest => ({
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
export const makeMockHandler =
  (env: AppEnv) =>
  (req: express.Request, res: express.Response): Promise<express.Response> =>
    pipe(
      processRequest(makeMockRequestFromExpressRequest(req)),
      RTE.fold(
        (_) => RTE.of(res.status(500).json(problemDetail500)),
        ({ statusCode, headers, body }) =>
          RTE.of(res.status(statusCode).header(headers).send(body))
      ),
      RTE.toUnion
    )(env)();
