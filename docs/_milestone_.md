# December Milestone

## Overview

- Complete the epics:
  - `Add Support for Partitioned Database`
  - `Inclusion of related models`

## Goals

- [ ] Inclusion of related models [MVP]
      https://github.com/strongloop/loopback-next/issues/1352

  - [ ] [5]Reject create/update requests when data contains navigational
        properties https://github.com/strongloop/loopback-next/issues/3439

- [ ] Authentication & Authorization
      https://github.com/strongloop/loopback-next/issues/3902

  - [ ] [5]Contribute OpenAPI spec pieces from extensions
        https://github.com/strongloop/loopback-next/issues/3854
  - [ ] [3]Add user profile factory for authentication modules
        https://github.com/strongloop/loopback-next/issues/3846

- [ ] [Epic] Add Support for Partitioned Database
      https://github.com/strongloop/loopback-connector-cloudant/issues/219

  - [ ] [3]Optimize query by reading partition key from payload
        https://github.com/strongloop/loopback-connector-cloudant/issues/217

- [ ] Production deployment/logging/monitoring
      https://github.com/strongloop/loopback-next/issues/1054

  - [ ] [5][blog post] Show how to deploy a LB application in a cloud native
        environment https://github.com/strongloop/loopback-next/issues/3715

- [ ] From model definition to REST API with no custom repository/controller
      classes https://github.com/strongloop/loopback-next/issues/2036

  - [ ] [5]Model API booter & builder
        https://github.com/strongloop/loopback-next/issues/3736

- [ ] Migration guide between LB3 to LB4 [MVP]
      https://github.com/strongloop/loopback-next/issues/453

  - [ ] [3]How to migrate user-defined model methods #3949
  - [ ] [5]How to migrate remoting hooks #3950

- [ ] Miscellaneous
  - [ ] [8]Spike: Discover and define models at runtime
        https://github.com/strongloop/loopback-next/issues/2484
  - [ ] [5]Column is always integer when running `npm run migrate`
        https://github.com/strongloop/loopback-next/issues/2398

## Stretch Goals

- [ ] From model definition to REST API with no custom repository/controller
      classes https://github.com/strongloop/loopback-next/issues/2036

  - [ ] [3]Add CrudRestApiBuilder to `@loopback/rest-crud`,
        https://github.com/strongloop/loopback-next/issues/3737
  - [ ] [3]Example app showing CrudRestApiBuilder
        https://github.com/strongloop/loopback-next/issues/3738

- [ ] Authentication & Authorization
      https://github.com/strongloop/loopback-next/issues/3902
  - [ ] [5]The First Scenario: Authenticated orders (a minimal authentication)
        https://github.com/strongloop/loopback-next/issues/1998
