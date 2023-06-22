import * as TE from 'fp-ts/TaskEither';
import { mock } from 'jest-mock-extended';
import { Capabilities } from '../Capabilities';
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
};

export const makeFakeCapabilities = (defaultData: typeof data = data) => {
  const mocked = {
    mock: mock<Capabilities['mock']>(),
    requestResponseReader: mock<Capabilities['requestResponseReader']>(),
    requestResponseWriter: mock<Capabilities['requestResponseWriter']>(),
  };
  // default behavior
  mocked.mock.generateResponse.mockReturnValue(
    TE.right(defaultData.mock.anHttpResponse)
  );
  mocked.requestResponseWriter.record.mockImplementation(TE.of);
  mocked.requestResponseReader.list.mockReturnValue(
    TE.of([defaultData.requestResponse.aRequestResponse])
  );

  // return within data
  return { env: mocked, envData: defaultData };
};
