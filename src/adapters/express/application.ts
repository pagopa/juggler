/**
 * This file contains all the methods you need to instance an application with the required capabilities.
 */
import http from 'http';
import express from 'express';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { Config } from '../../config';
import { makeMockHandler } from './mockHandler';
import { AppEnv } from './AppEnv';
import { makeGetRequestResponseRouter } from './getRequestResponseRouter';
import { makeUIDashboardRouter } from './makeUIDashboardRouter';

/**
 * Create an instance of {@link express.Application} given all the required capabilities.
 */
export const makeApplication = (env: AppEnv): express.Application => {
  const application = express();
  application.use(express.json());

  application.use(makeUIDashboardRouter(env));
  application.use(makeGetRequestResponseRouter(env));
  application.use(makeMockHandler(env));

  return application;
};

/**
 * Start the provided {@link express.Application} using the given configuration.
 */
export const startApplication = (
  config: Config,
  application: express.Application
): TE.TaskEither<Error, http.Server> => {
  const server = http.createServer(application);
  const { hostname, port } = config.server;
  const promise = new Promise<http.Server>((resolve, reject) => {
    server.listen(port, hostname, () => resolve(server));
    server.once('error', (error) =>
      server.listening === false ? reject(error) : {}
    );
  });
  return TE.tryCatch(() => promise, E.toError);
};
