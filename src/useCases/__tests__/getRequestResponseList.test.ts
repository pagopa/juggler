import * as E from 'fp-ts/Either';
import { getRequestResponseList } from '../getRequestResponseList';
import { makeFakeCapabilities } from '../../domain/__tests__/data';

describe('getRequestResponseList', () => {
  it('should return a list of request-response pair', async () => {
    const { env, envData } = makeFakeCapabilities();

    const actual = await getRequestResponseList()(env)();
    const expected = [envData.requestResponse.aRequestResponse];
    expect(actual).toStrictEqual(E.of(expected));
  });
});
