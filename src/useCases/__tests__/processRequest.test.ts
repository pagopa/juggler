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
});
