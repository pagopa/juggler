import * as TE from 'fp-ts/TaskEither';
import { OpenAPI } from 'openapi-types';

// For now use the types of OpenAPI types
export type OpenAPISpec = OpenAPI.Document;

/**
 * TODO
 */
export type OpenAPIParser = {
  /**
   * TODO
   */
  parse: (url: string) => TE.TaskEither<Error, OpenAPISpec>;
};
