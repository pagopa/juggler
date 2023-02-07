import { pipe } from 'fp-ts/lib/function';
import * as R from 'fp-ts/Reader';
import { Capabilities } from '../domain/Capabilities';

export const getRequestResponseList = () =>
  pipe(
    R.ask<Pick<Capabilities, 'requestResponseReader'>>(),
    R.map(({ requestResponseReader }) => requestResponseReader.list())
  );
