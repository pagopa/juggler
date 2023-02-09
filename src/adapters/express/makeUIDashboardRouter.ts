import path from 'path';
import express from 'express';

export const makeUIDashboardRouter = (): express.Router => {
  const router = express.Router();

  const uidashboardPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'uidashboard',
    'build'
  );

  router.use(express.static(path.join(uidashboardPath)));
  router.use('/_dashboard', (_, res) =>
    res.sendFile(path.join(uidashboardPath, 'index.html'))
  );

  return router;
};
