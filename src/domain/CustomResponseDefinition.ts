import { HttpRequest, HttpResponse } from './RequestResponse';

export type CustomResponseDefinition = {
  match: HttpRequest;
  response: HttpResponse;
};

// Return true if match matches request
export const matches = (match: HttpRequest, request: HttpRequest): boolean =>
  match.method === request.method && match.url.path === request.url.path;

export type ListCustomResponseDefinition =
  () => ReadonlyArray<CustomResponseDefinition>;
