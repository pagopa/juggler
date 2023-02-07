import * as TE from 'fp-ts/TaskEither';
import { mock } from 'jest-mock-extended';
import { Capabilities } from '../Capabilities';
import { MockOutput, MockRequest } from '../Mock';

const aMockRequest: MockRequest = {
  method: 'get',
  url: { path: 'http://localhost:8080/hello?name=Rupert' },
};

const aMockOutput: MockOutput = {
  status: 200,
  headers: {},
  data: {},
  request: aMockRequest,
  violations: { input: [], output: [] },
};

export const data = {
  mock: {
    aMockRequest,
    aMockOutput,
  },
  requestResponse: {
    aRequestResponse: {
      request: aMockRequest,
      response: aMockOutput,
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
    TE.right(defaultData.mock.aMockOutput)
  );
  mocked.requestResponseWriter.record.mockImplementation(TE.of);
  mocked.requestResponseReader.list.mockReturnValue(
    TE.of([defaultData.requestResponse.aRequestResponse])
  );

  // return within data
  return { env: mocked, envData: defaultData };
};
