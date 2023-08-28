import * as E from 'fp-ts/Either';
import { processRequest } from '../processRequest';
import { makeFakeCapabilities } from '../../domain/__tests__/data';

describe('processRequest', () => {
  it('should return mock response', async () => {
    const { env, envData } = makeFakeCapabilities();

    const actual = await processRequest(envData.mock.anHttpRequest)(env)();
    const expected = envData.requestResponse.aRequestResponse.response;
    expect(actual).toStrictEqual(E.right(expected));
  });
  it('should record the request-response pair', async () => {
    const { env, envData } = makeFakeCapabilities();

    await processRequest(envData.mock.anHttpRequest)(env)();
    const expected = envData.requestResponse.aRequestResponse;
    expect(env.requestResponseWriter.record).nthCalledWith(1, expected);
  });
  it('should return the response defined by user if any', async () => {
    const { env, envData } = makeFakeCapabilities();

    const actual = await processRequest({
      ...envData.customResponseDefinition.anHttpRequest,
    })(env)();
    const expected = envData.customResponseDefinition.anHttpResponse;
    expect(env.mock.generateResponse).toBeCalledTimes(0);
    expect(actual).toStrictEqual(E.right(expected));
  });
});
