import { pipe } from 'fp-ts/function';
import * as R from 'fp-ts/Reader';
import { Config } from '../config';
import { Capabilities } from '../domain/Capabilities';

export const getOpenApiSpec =
  (_serverConfig: Config['server']) => (openApiURL: string) =>
    pipe(
      R.ask<Pick<Capabilities, 'openApiParser'>>(),
      R.map(({ openApiParser }) => openApiParser.parse(openApiURL))
    );
