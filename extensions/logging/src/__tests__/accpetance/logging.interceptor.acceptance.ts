// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/extension-health
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {extensionFor} from '@loopback/core';
import {get, param, RestApplication, RestServerConfig} from '@loopback/rest';
import {
  Client,
  createRestAppClient,
  expect,
  givenHttpServerConfig,
} from '@loopback/testlab';
import {format, transports} from 'winston';
import {
  Format,
  log,
  LoggingComponent,
  TransformableInfo,
  WINSTON_FORMAT,
  WINSTON_TRANSPORT,
} from '../..';

describe('Logging interceptor', () => {
  let app: RestApplication;
  let request: Client;
  let logs: TransformableInfo[] = [];

  class MyController {
    @get('/greet/{name}')
    @log()
    greet(@param.path.string('name') name: string) {
      return `Hello, ${name}`;
    }

    @get('/hello/{name}')
    hello(@param.path.string('name') name: string) {
      return `Hello, ${name}`;
    }
  }

  before(async () => {
    app = givenRestApplication();
    app.controller(MyController);
    logs = [];
    const myFormat: Format = format((info, opts) => {
      logs.push(info);
      return false;
    })();
    app
      .bind('logging.winston.formats.myFormat')
      .to(myFormat)
      .apply(extensionFor(WINSTON_FORMAT));
    const consoleTransport = new transports.Console({
      level: 'verbose',
      format: myFormat,
    });
    app
      .bind('logging.winston.transports.console')
      .to(consoleTransport)
      .apply(extensionFor(WINSTON_TRANSPORT));
    app.component(LoggingComponent);
    await app.start();
    request = createRestAppClient(app);
  });

  after(async () => {
    if (app) await app.stop();
    (app as unknown) = undefined;
  });

  beforeEach(() => {
    logs = [];
  });

  it('logs http req/res for /hello', async () => {
    await request.get('/hello/John').expect(200);
    expect(logs.length).to.equal(2);
    expect(logs[0].level).to.equal('info');
    expect(logs[0].message).to.match(/request - GET \/hello\/John/);
    expect(logs[1].level).to.equal('info');
    expect(logs[1].message).to.match(/response - 200/);
  });

  it('logs http req/res for /greet', async () => {
    await request.get('/greet/John').expect(200);
    expect(logs.length).to.equal(4);
    expect(logs[0].level).to.equal('info');
    expect(logs[0].message).to.match(/request - GET \/greet\/John/);
    expect(logs[3].level).to.equal('info');
    expect(logs[3].message).to.match(/response - 200/);
  });

  it('logs method invocation of greet()', async () => {
    await request.get('/greet/Jane').expect(200);
    expect(logs).to.containEql({
      level: 'verbose',
      message: "invoking MyController.prototype.greet with: [ 'Jane' ]",
    });
    expect(logs).to.containEql({
      level: 'verbose',
      message: 'returned from MyController.prototype.greet: Hello, Jane',
    });
  });

  function givenRestApplication(config?: RestServerConfig) {
    const rest = Object.assign({}, givenHttpServerConfig(), config);
    return new RestApplication({rest});
  }
});
