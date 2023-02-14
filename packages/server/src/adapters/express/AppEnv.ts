import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { Capabilities } from '@juggler/core/dist/domain/Capabilities';
import { makeRequestResponseStore } from '@juggler/core/dist/adapters/array/makeRequestResponseStore';
import { makeMock } from '@juggler/core/dist/adapters/prism/makeMock';
import { Config } from '../../config';

export type AppEnv = Capabilities;

/**
 * Given the config returns an AppEnv.
 */
export const makeAppEnv = (config: Config): TE.TaskEither<Error, AppEnv> =>
  pipe(
    TE.Do,
    TE.apS('mock', makeMock(config.openapi.URL)),
    TE.apS('requestResponseStore', TE.of(makeRequestResponseStore([]))),
    TE.map(({ mock, requestResponseStore }) => ({
      mock,
      requestResponseReader: requestResponseStore,
      requestResponseWriter: requestResponseStore,
    }))
  );
