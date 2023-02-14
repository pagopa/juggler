import * as TE from 'fp-ts/TaskEither';
import {
  RequestResponseWriter,
  RequestResponseReader,
  RequestResponse,
} from '../../domain/RequestResponse';

export const makeRequestResponseStore = (
  snapshot: ReadonlyArray<RequestResponse>
): RequestResponseReader & RequestResponseWriter => {
  // At the moment, keeping them in memory in a mutable variable is enough.
  // eslint-disable-next-line functional/no-let
  let store = [...snapshot];
  return {
    record: (element) => {
      store = [...store, element];
      return TE.of(element);
    },
    list: () => TE.of(store),
  };
};
