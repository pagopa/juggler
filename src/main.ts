import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { makeMock } from './adapters/prism/makeMock';
import {
  makeApplication,
  startApplication,
} from './adapters/express/application';
import { parseConfig } from './config';

pipe(
  TE.fromEither(parseConfig(process.env)),
  TE.chain((config) =>
    pipe(
      makeMock(config.openapi.URL),
      TE.map((mock) => startApplication(config, makeApplication(mock))),
      TE.mapLeft((error) => JSON.stringify(error))
    )
  ),
  TE.mapLeft((msgError) => console.log(msgError))
)();
