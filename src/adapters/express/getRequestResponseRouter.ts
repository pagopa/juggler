import express from 'express';
import { pipe } from 'fp-ts/lib/function';
import * as RA from 'fp-ts/ReadonlyArray';
import * as RTE from 'fp-ts/ReaderTaskEither';
import { RequestResponse } from '../../domain/RequestResponse';
import { getRequestResponseList } from '../../useCases/getRequestResponseList';
import { AppEnv } from './AppEnv';
import { problemDetail500 } from './errors';
import { RequestResponse as APIRequestResponse } from './generated/apicodec/RequestResponse';
import { RequestResponseList as APIRequestResponseList } from './generated/apicodec/RequestResponseList';
import { MethodEnum as HTTPMethodEnum } from './generated/apicodec/HTTPRequest';

const makeAPIRequestResponse = (
  input: RequestResponse
): APIRequestResponse => ({
  request: {
    method: HTTPMethodEnum[input.request.method],
    url: input.request.url.path,
    headers: input.request.headers || {},
    body: input.request.body || {},
  },
  response: {
    status: input.response.statusCode,
    headers: input.response.headers || {},
    body: input.response.body || {},
  },
});

const makeAPIResponse = (
  input: ReadonlyArray<RequestResponse>
): APIRequestResponseList => pipe(input, RA.map(makeAPIRequestResponse));

export const makeGetRequestResponseRouter = (env: AppEnv): express.Router => {
  const router = express.Router();

  router.get('/api/requestresponse', (_req, res) =>
    pipe(
      getRequestResponseList(),
      RTE.fold(
        (_) => RTE.of(res.status(500).json(problemDetail500)),
        (list) => RTE.of(res.status(200).json(makeAPIResponse(list)))
      ),
      RTE.toUnion
    )(env)()
  );

  return router;
};
