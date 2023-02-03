/**
 * This file contains all the methods you need to instance an application with the required capabilities.
 */
import http from 'http';
import express from 'express';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { Config } from '../../config';
import { Mock } from '../../domain/Mock';
import { makeHandler } from './handler';

/**
 * Create an instance of {@link express.Application} given all the required capabilities.
 */
export const makeApplication = (mock: Mock): express.Application => {
  const application = express();
  application.use(express.json());

  application.use(makeHandler(mock));

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
