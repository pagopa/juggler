import * as TE from 'fp-ts/TaskEither';
import { OpenAPI } from 'openapi-types';

// For now use the types of OpenAPI types
export type OpenAPISpec = OpenAPI.Document;

/**
 * This type express the capability to parse an OpenAPI specification from a URL.
 */
export type OpenAPIParser = {
  /**
   * Given a URL, parse the OpenAPI specification.
   */
  parse: (url: string) => TE.TaskEither<Error, OpenAPISpec>;
};
