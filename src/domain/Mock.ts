import * as TE from 'fp-ts/lib/TaskEither';
import { IHttpRequest } from '@stoplight/prism-http';
import { PrismHttp } from '@stoplight/prism-http/dist/client';

// For now use the types of prism
export type MockRequest = IHttpRequest;
export type MockOutput = Awaited<ReturnType<PrismHttp['request']>>;

export type Mock = {
  generateResponse: (req: MockRequest) => TE.TaskEither<Error, MockOutput>;
};
