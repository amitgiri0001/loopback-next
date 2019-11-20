// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/extension-logging
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  bind,
  Binding,
  Component,
  config,
  ContextTags,
  extensionFor,
  ProviderMap,
} from '@loopback/core';
import {Options} from 'fluent-logger';
import {FluentSenderProvider, FluentTransportProvider} from './fluent';
import {AccessLogInterceptor, LoggingInterceptor} from './interceptors';
import {LoggingBindings} from './keys';
import {WinstonLoggerProvider, WINSTON_TRANSPORT} from './winston';

/**
 * A component providing logging facilities
 */
@bind({tags: {[ContextTags.KEY]: LoggingBindings.COMPONENT}})
export class LoggingComponent implements Component {
  providers: ProviderMap;
  bindings: Binding<unknown>[];

  constructor(
    @config({fromBinding: LoggingBindings.FLUENT_SENDER})
    fluentConfig: Options | undefined,
  ) {
    this.providers = {
      [LoggingBindings.FLUENT_SENDER.key]: FluentSenderProvider,
      [LoggingBindings.WINSTON_LOGGER.key]: WinstonLoggerProvider,
      [LoggingBindings.WINSTON_INTERCEPTOR.key]: LoggingInterceptor,
      [LoggingBindings.WINSTON_ACCESS_LOGGER.key]: AccessLogInterceptor,
    };

    if (fluentConfig != null) {
      // Only create fluent transport if it's configured
      this.bindings = [
        Binding.bind(LoggingBindings.WINSTON_TRANSPORT_FLUENT)
          .toProvider(FluentTransportProvider)
          .apply(extensionFor(WINSTON_TRANSPORT)),
      ];
    }
  }
}
