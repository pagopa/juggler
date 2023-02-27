/**
 * This file contains all the methods you need to instance an application with the required capabilities.
 */
import http from 'http';
import express from 'express';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import next from 'next';
import { NextServer } from 'next/dist/server/next';
import { makeMockHandler } from './mockHandler';
import { AppEnv } from './AppEnv';
import { makeGetRequestResponseRouter } from './getRequestResponseRouter';

/**
 * Create an instance of {@link express.Application} given all the required capabilities.
 */
const makeApplication = (
  env: AppEnv,
  nextServer: NextServer
): express.Application => {
  const application = express();
  const nextHandler = nextServer.getRequestHandler();
  application.use(express.json());

  // TODO remove duplication of this "ui" and the value of basePath on
  // next.config.js they should be the same value
  application.all('/ui/*', (req, res) => nextHandler(req, res));
  application.use(makeGetRequestResponseRouter(env));
  application.use(makeMockHandler(env));

  return application;
};

/**
 * Start the provided {@link express.Application} using the given configuration.
 */
export const startApplication = (
  env: AppEnv
): TE.TaskEither<Error, http.Server> => {
  const { hostname, port } = env.server;
  const nextServer = next({ dev: true, hostname, port });

  return TE.tryCatch(
    () =>
      new Promise<http.Server>((resolve, reject) => {
        void nextServer.prepare().then(() => {
          const server = http.createServer(makeApplication(env, nextServer));
          server.listen(port, hostname, () => resolve(server));
          server.once('error', (error) =>
            server.listening === false ? reject(error) : {}
          );
        });
      }),
    E.toError
  );
};
