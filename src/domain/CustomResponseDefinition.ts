import { HttpRequest, HttpResponse } from './RequestResponse';

export type CustomResponseDefinition = {
  match: HttpRequest;
  response: HttpResponse;
};

export type ListCustomResponseDefinition =
  () => ReadonlyArray<CustomResponseDefinition>;
