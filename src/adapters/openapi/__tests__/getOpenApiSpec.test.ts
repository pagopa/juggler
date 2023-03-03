import path from 'path';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { fetchOpenApiContent } from '../getOpenApiSpec';

describe('fetchOpenApiContent', () => {
  const validSpecPath = path.resolve('docs/openapi/juggler.yaml');
  it('should return the fetched content', async () => {
    const actual0 = await fetchOpenApiContent('', 'invalid/path')();
    expect(E.isLeft(actual0)).toStrictEqual(true);

    const actual1 = await fetchOpenApiContent('', validSpecPath)();
    expect(
      pipe(
        actual1,
        E.map(({ fromOrigin }) => fromOrigin)
      )
    ).toStrictEqual(E.right(false));
    expect(E.isRight(actual1)).toStrictEqual(true);

    const actual2 = await fetchOpenApiContent(
      'https://pagopa.it',
      validSpecPath
    )();
    expect(
      pipe(
        actual2,
        E.map(({ fromOrigin }) => fromOrigin)
      )
    ).toStrictEqual(E.right(false));
    expect(E.isRight(actual2)).toStrictEqual(true);

    const actual3 = await fetchOpenApiContent(
      'just an ordinary string',
      validSpecPath
    )();
    expect(
      pipe(
        actual3,
        E.map(({ fromOrigin }) => fromOrigin)
      )
    ).toStrictEqual(E.right(false));
    expect(E.isRight(actual3)).toStrictEqual(true);
    const validUrl =
      'https://github.com/pagopa/pn-delivery/raw/d499410/docs/openapi/api-external-b2b-pa-v1.yaml';

    const actual4 = await fetchOpenApiContent(validUrl, validSpecPath)();
    expect(
      pipe(
        actual4,
        E.map(({ fromOrigin }) => fromOrigin)
      )
    ).toStrictEqual(E.right(true));
    expect(E.isRight(actual3)).toStrictEqual(true);
  });
});
