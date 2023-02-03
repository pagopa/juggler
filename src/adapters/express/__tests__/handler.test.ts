import express from 'express';
import { makeMockRequestFromExpressRequest } from '../handler';

describe('makeMockRequestFromExpressRequest', () => {
  it('transform an express request without error', () => {
    const expressRequest = {
      method: 'POST',
      url: 'http://127.0.0.1/hello?queryParam=42',
      headers: {
        'x-header-a': 'header-value',
        'x-header-b': ['header-a', 'header-b'],
        'x-header-c': undefined,
      },
      body: {
        'field-a': 'field-a-value',
      },
    } as unknown as express.Request;
    const actual = makeMockRequestFromExpressRequest(expressRequest);
    expect(actual).toStrictEqual({
      url: { path: expressRequest.headers.path },
      method: 'post',
      headers: {
        'x-header-a': 'header-value',
        'x-header-b': 'header-a, header-b',
      },
      body: expressRequest.body,
    });
  });
});
