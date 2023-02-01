import http from 'http';
import express from 'express';
import { Config } from '../../config';
import { Mock } from '../../domain/Mock';
import { makeHandler } from './handler';

export const makeApplication = (mock: Mock): express.Application => {
  const application = express();
  application.use(express.json());

  application.use(makeHandler(mock));

  return application;
};

export const startApplication = (
  config: Config,
  application: express.Application
): void => {
  const server = http.createServer(application);
  const { hostname, port } = config.server;
  server.listen(port, hostname, () =>
    console.log(`Server is listening on ${hostname}:${port}`)
  );
};
