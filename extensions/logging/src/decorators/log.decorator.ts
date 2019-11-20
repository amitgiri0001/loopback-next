// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/extension-logging
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {intercept} from '@loopback/context';
import {LoggingBindings} from '../keys';

/**
 * @log decorator for method invocations
 */
export function log() {
  return intercept(LoggingBindings.WINSTON_INTERCEPTOR);
}
