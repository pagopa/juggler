import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { Capabilities } from '@juggler/core/dist/domain/Capabilities';
import { Config } from '../../config';
import { makeRequestResponseStore } from '../array/makeRequestResponseStore';
import { makeMock } from '../prism/makeMock';

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
