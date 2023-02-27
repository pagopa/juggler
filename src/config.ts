import { pipe } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import * as tt from 'io-ts-types';
import * as E from 'fp-ts/Either';
import * as PR from 'io-ts/PathReporter';

export type Config = {
  server: {
    hostname: string;
    port: number;
  };
  openapi: {
    URL: string;
  };
  nodeEnv: 'development' | 'production' | 'test';
};

const EnvCodec = t.type({
  PORT: tt.NumberFromString,
  HOSTNAME: t.string,
  OPENAPI_URL: t.string,
  NODE_ENV: t.union([
    t.literal('development'),
    t.literal('production'),
    t.literal('test'),
    t.undefined,
  ]),
});

export const parseConfig = (
  envs: Record<string, undefined | string>
): E.Either<string, Config> =>
  pipe(
    EnvCodec.decode(envs),
    E.bimap(
      (errors) => PR.failure(errors).join('\n'),
      (envs) => ({
        server: {
          port: envs.PORT,
          hostname: envs.HOSTNAME,
        },
        openapi: {
          URL: envs.OPENAPI_URL,
        },
        nodeEnv: envs.NODE_ENV || 'development',
      })
    )
  );
