import express from 'express';
import { pipe } from 'fp-ts/lib/function';
import * as RTE from 'fp-ts/ReaderTaskEither';
import { getOpenApiSpec } from '../../useCases/getOpenApiSpec';
import { AppEnv } from './AppEnv';
import { problemDetail500 } from './errors';

export const makeGetOpenApiRouter = (env: AppEnv): express.Router => {
  const router = express.Router();

  // In the future this feature can be mapped into the domain
  router.get('/api/openapi', (_req, res) =>
    pipe(
      getOpenApiSpec(env.server)(env.openapi.URL),
      RTE.fold(
        (_) => RTE.of(res.status(500).json(problemDetail500)),
        (spec) => RTE.of(res.status(200).json(spec))
      ),
      RTE.toUnion
    )(env)()
  );

  return router;
};
