import express from 'express';
import { pipe } from 'fp-ts/lib/function';
import * as RTE from 'fp-ts/ReaderTaskEither';
import { getRequestResponseList } from '../../useCases/getRequestResponseList';
import { AppEnv } from './AppEnv';

export const makeGetRequestResponseRouter = (env: AppEnv): express.Router => {
  const router = express.Router();

  router.get('/requestresponse', (_req, res) =>
    pipe(
      getRequestResponseList(),
      RTE.fold(
        (_) => RTE.of(res.status(500)),
        (list) => RTE.of(res.status(200).json(list))
      ),
      RTE.toUnion
    )(env)()
  );

  return router;
};
