import path from 'path';
import express from 'express';
import { AppEnv } from './AppEnv';

export const makeUIDashboardRouter = (env: AppEnv): express.Router => {
  const router = express.Router();

  const uidashboardPath = path.join(env.rootDir, 'ui-dashboard');

  router.use(express.static(path.join(uidashboardPath)));
  router.use('/_dashboard', (_, res) =>
    res.sendFile(path.join(uidashboardPath, 'index.html'))
  );

  return router;
};
