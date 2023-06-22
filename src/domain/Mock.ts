import * as TE from 'fp-ts/lib/TaskEither';
import { HttpRequest, HttpResponse } from './RequestResponse';

/**
 * This type exposes the capability to create fake responses
 */
export type Mock = {
  /**
   * Given a request, produce a fake response.
   */
  generateResponse: (req: HttpRequest) => TE.TaskEither<Error, HttpResponse>;
};
