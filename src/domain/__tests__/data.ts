import * as TE from 'fp-ts/TaskEither';
import { mock } from 'jest-mock-extended';
import { Capabilities } from '../Capabilities';
import { CustomResponseDefinition } from '../CustomResponseDefinition';
import { HttpRequest, HttpResponse } from '../RequestResponse';

const anHttpRequest: HttpRequest = {
  method: 'get',
  url: { path: 'http://localhost:8080/hello?name=Rupert' },
};

const anHttpResponse: HttpResponse = {
  statusCode: 200,
  headers: {},
  body: {},
};

const customResponseDefinition: CustomResponseDefinition = {
  match: {
    method: 'post',
    url: { path: 'http://localhost:8080/hello?name=Rupert' },
  },
  response: {
    statusCode: 200,
    headers: {
      'x-custom': 'custom-response-definition',
    },
    body: {},
  },
};

export const data = {
  mock: {
    anHttpRequest,
    anHttpResponse,
  },
  requestResponse: {
    aRequestResponse: {
      request: anHttpRequest,
      response: anHttpResponse,
    },
  },
  customResponseDefinition: {
    anHttpRequest: customResponseDefinition.match,
    anHttpResponse: customResponseDefinition.response,
  },
};

export const makeFakeCapabilities = (defaultData: typeof data = data) => {
  const mocked = {
    mock: mock<Capabilities['mock']>(),
    requestResponseReader: mock<Capabilities['requestResponseReader']>(),
    requestResponseWriter: mock<Capabilities['requestResponseWriter']>(),
    listCustomResponseDefinition:
      mock<Capabilities>().listCustomResponseDefinition,
  };
  // default behavior
  mocked.mock.generateResponse.mockReturnValue(
    TE.right(defaultData.mock.anHttpResponse)
  );
  mocked.requestResponseWriter.record.mockImplementation(TE.of);
  mocked.requestResponseReader.list.mockReturnValue(
    TE.of([defaultData.requestResponse.aRequestResponse])
  );
  mocked.listCustomResponseDefinition.mockReturnValue([
    customResponseDefinition,
  ]);

  // return within data
  return { env: mocked, envData: defaultData };
};
