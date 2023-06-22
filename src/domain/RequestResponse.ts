import * as TE from 'fp-ts/TaskEither';
import { IHttpRequest, IHttpResponse } from '@stoplight/prism-http';

// For now use the types of prism
export type HttpRequest = IHttpRequest;
export type HttpResponse = IHttpResponse;

/**
 * Represents the request-response pair provided by the Mock.
 */
export type RequestResponse = {
  // I didn't found a better term from the RFC 2616.
  // https://www.rfc-editor.org/rfc/rfc2616.html#section-4
  request: HttpRequest;
  response: HttpResponse;
};

/**
 * This type represents the capability to record a request-response pair.
 */
export type RequestResponseWriter = {
  /**
   * Store the given request-response pair.
   */
  record: (
    requestResponse: RequestResponse
  ) => TE.TaskEither<Error, RequestResponse>;
};

/**
 * This type represents the capability to retrieve the request-response pair
 * previously recorded.
 */
export type RequestResponseReader = {
  /**
   * Return all the request-response pair recorded. We'll probably need to
   * paginate the response in the future with a cursor-based pagination.
   */
  list: () => TE.TaskEither<Error, ReadonlyArray<RequestResponse>>;
};
