import * as E from 'fp-ts/Either';
import { processRequest } from '../processRequest';
import { makeFakeCapabilities } from '../../domain/__tests__/data';

describe('processRequest', () => {
  it('should return mock response', async () => {
    const { env, envData } = makeFakeCapabilities();

    const actual = await processRequest(envData.mock.aMockRequest)(env)();
    const exptected = envData.requestResponse.aRequestResponse.response;
    expect(actual).toStrictEqual(E.right(exptected));
  });
  it('should record the request-response pair', async () => {
    const { env, envData } = makeFakeCapabilities();

    await processRequest(envData.mock.aMockRequest)(env)();
    const exptected = envData.requestResponse.aRequestResponse;
    expect(env.requestResponseWriter.record).toBeCalledTimes(1);
    expect(env.requestResponseWriter.record).toBeCalledWith(exptected);
  });
});