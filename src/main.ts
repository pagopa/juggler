/**
 * The entry-point of the system
 */
import { pipe } from 'fp-ts/lib/function';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import {
  makeApplication,
  startApplication,
} from './adapters/express/application';
import { parseConfig } from './config';
import { makeAppEnv } from './adapters/express/AppEnv';

void pipe(
  TE.fromEither(parseConfig(process.env)),
  TE.chain((config) =>
    pipe(
      makeAppEnv(config),
      TE.chain((env) => startApplication(config, makeApplication(env))),
      TE.bimap(
        (error) => JSON.stringify(error),
        (server) => `Server is listening on ${JSON.stringify(server.address())}`
      )
    )
  ),
  TE.toUnion,
  // eslint-disable-next-line no-console
  T.map((message) => console.log(message))
)();
