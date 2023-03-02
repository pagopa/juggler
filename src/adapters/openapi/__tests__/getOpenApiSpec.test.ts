import { fetchOpenApiContent } from '../getOpenApiSpec';

describe('fetchOpenApiContent', () => {
  it('should return the fetched content', async () => {
    const actual0 = await fetchOpenApiContent('')();
    expect(actual0.fromOrigin).toStrictEqual(false);
    const actual1 = await fetchOpenApiContent('https://pagopa.it')();
    expect(actual1.fromOrigin).toStrictEqual(false);
    const actual2 = await fetchOpenApiContent('just an ordinary string')();
    expect(actual2.fromOrigin).toStrictEqual(false);

    const validUrl =
      'https://github.com/pagopa/pn-delivery/raw/d499410/docs/openapi/api-external-b2b-pa-v1.yaml';
    const actual3 = await fetchOpenApiContent(validUrl)();
    expect(actual3.fromOrigin).toStrictEqual(true);
  });
});
