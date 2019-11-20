// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/extension-logging
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  asGlobalInterceptor,
  bind,
  BindingScope,
  ContextTags,
  inject,
  Interceptor,
  InvocationContext,
  Provider,
  ValueOrPromise,
} from '@loopback/context';
import {RequestContext, RestBindings} from '@loopback/rest';
import {format} from 'util';
import {Logger} from 'winston';
import {LoggingBindings} from '../keys';

/**
 * A local interceptor that provides logging for method invocations.
 */
@bind({
  tags: {[ContextTags.KEY]: LoggingBindings.WINSTON_INTERCEPTOR},
  scope: BindingScope.SINGLETON,
})
export class LoggingInterceptor implements Provider<Interceptor> {
  constructor(
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: Logger,
  ) {}

  value() {
    return this.intercept.bind(this);
  }

  async intercept<T>(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<T>,
  ) {
    try {
      this.logger.log(
        'verbose',
        format(
          'invoking %s with:',
          invocationCtx.targetName,
          invocationCtx.args,
        ),
      );
      const result = await next();
      this.logger.log(
        'verbose',
        format('returned from %s:', invocationCtx.targetName, result),
      );
      return result;
    } catch (err) {
      this.logger.log(
        'error',
        format('error from %s', invocationCtx.targetName, err),
      );
      throw err;
    }
  }
}

/**
 * A global interceptor that provides logging for http requests/responses.
 */
@bind(asGlobalInterceptor('logging'), {
  tags: {[ContextTags.KEY]: LoggingBindings.WINSTON_ACCESS_LOGGER},
  scope: BindingScope.SINGLETON,
})
export class AccessLogInterceptor implements Provider<Interceptor> {
  constructor(
    @inject(LoggingBindings.WINSTON_LOGGER)
    private logger: Logger,
  ) {}

  value() {
    return this.intercept.bind(this);
  }

  async intercept<T>(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<T>,
  ) {
    const reqCtx = await invocationCtx.get<RequestContext>(
      RestBindings.Http.CONTEXT,
    );
    const {request: req, response: res} = reqCtx;
    try {
      this.logger.log(
        'info',
        format('request - %s %s %j', req.method, req.originalUrl, req.headers),
      );
      const result = await next();
      this.logger.log(
        'info',
        format('response - %s %j', res.statusCode, res.getHeaders()),
      );
      return result;
    } catch (err) {
      this.logger.log(
        'error',
        format('response - %s %j', res.statusCode, res.getHeaders(), err),
      );
      throw err;
    }
  }
}
