import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { Config } from '../../config';
import { Capabilities } from '../../domain/Capabilities';
import { makeRequestResponseStore } from '../array/makeRequestResponseStore';
import { makeMock } from '../prism/makeMock';
import { makeOpenAPIParser } from '../swagger-parser/makeOpenAPIParser';

export type AppEnv = Capabilities & Config;

/**
 * Given the config returns an AppEnv.
 */
export const makeAppEnv = (config: Config): TE.TaskEither<Error, AppEnv> =>
  pipe(
    TE.Do,
    TE.apS('mock', makeMock(config.openapi.URL)),
    TE.apS('requestResponseStore', TE.of(makeRequestResponseStore([]))),
    TE.apS('openAPIParser', TE.of(makeOpenAPIParser(config.server))),
    TE.map(({ mock, requestResponseStore, openAPIParser }) => ({
      ...config,
      mock,
      requestResponseReader: requestResponseStore,
      requestResponseWriter: requestResponseStore,
      openApiParser: openAPIParser,
    }))
  );
