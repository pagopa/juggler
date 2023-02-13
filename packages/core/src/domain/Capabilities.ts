/**
 * This file is a capabilities mapper, maps a capability to a given key.
 */

import { Mock } from './Mock';
import {
  RequestResponseReader,
  RequestResponseWriter,
} from './RequestResponse';

/**
 * Maps the capabilities to a given property name. Pick the capability using the
 * `Pick` type utility.
 *
 * E.g.: Pick<Capabilities, 'mock' | 'requestResponseReader'>
 */
export type Capabilities = {
  mock: Mock;
  requestResponseReader: RequestResponseReader;
  requestResponseWriter: RequestResponseWriter;
};
