import express from 'express';
import { makeMockRequestFromExpressRequest, makeMethod } from '../handler';

describe('makeMockRequestFromExpressRequest', () => {
  it('transform the express headers without error', () => {
    expect(makeMethod('DELETE')).toStrictEqual('delete');
    expect(makeMethod('GET')).toStrictEqual('get');
    expect(makeMethod('HEAD')).toStrictEqual('head');
    expect(makeMethod('OPTIONS')).toStrictEqual('options');
    expect(makeMethod('PATCH')).toStrictEqual('patch');
    expect(makeMethod('POST')).toStrictEqual('post');
    expect(makeMethod('PUT')).toStrictEqual('put');
    expect(makeMethod('TRACE')).toStrictEqual('trace');
    expect(makeMethod('unknown')).toStrictEqual('trace');
  });
  it('transform the express request without error', () => {
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
