import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import { parseConfig } from '../config';
import * as data from './data';

describe('Config', () => {
  describe('given an invalid configuration', () => {
    it('should fail because some property is missing', () => {
      const envs = {
        ...data.envs,
        HOSTNAME: undefined,
      };

      const actual = parseConfig(envs);
      expect(pipe(actual, E.isLeft)).toStrictEqual(true);
    });
  });

  describe('given a valid configuration', () => {
    it('should return a configuration', () => {
      const expected = E.right(data.config);
      const actual = parseConfig(data.envs);
      expect(actual).toStrictEqual(expected);
    });
  });
});
