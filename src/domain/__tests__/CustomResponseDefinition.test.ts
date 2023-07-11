import { matches } from '../CustomResponseDefinition';
import { data } from './data';

const request = data.requestResponse.aRequestResponse.request;

describe('matches', () => {
  it('should match requests without error', () => {
    expect(matches(request, request)).toBeTruthy();
    expect(matches({ ...request, method: 'post' }, request)).toBeFalsy();
    // ignore body during match
    expect(
      matches(
        {
          ...request,
          body: { a: 'a' },
        },
        {
          ...request,
          body: { b: 'b' },
        }
      )
    ).toBeTruthy();
  });
});
