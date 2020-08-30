---
title: Reactive Event-driven Architecture with Marble.js
date: '2020-08-31T00:00:00.000Z'
draft: true
---

[Marble.js 3.0 landed](https://medium.com/@jflakus/announcing-marble-js-3-0-a-marbellous-evolution-ba9cdc91d591) with a brand new module **[@marble/messaging](https://docs.marblejs.com/messaging/microservices)** for building event-based microservices architecture in a robust and unified way.

Martin Fowler defines the therm "Microservice Architecture" as a particular way of designing software applications as suites of independently deployable services.

### e-commerce sample application

Let's implement an e-commerce microservices architecture with Marble.js.

All requests from clients first go through the API Gateway. It then routes requests to the appropriate microservice.

![E-commerce Microservice Architecture Schema](./schema.png)

A distributed system must use an inter-process communication mechanism. The best option is to use an asynchronous messaging-based mechanism also called message brokers such as [RabbitMQ (AMQP)](https://www.rabbitmq.com/).

#### Available operations

The application will support the following operations REST operations :

| Microservice | Method | URI            | Description              |
| ------------ | ------ | -------------- | ------------------------ |
| Catalog      | `GET`  | `/products`    | Get a list of products.  |
| Cart         | `POST` | `/carts`       | Creates a cart.          |
| Cart         | `GET`  | `/carts/{id}`  | Get cart by id.          |
| Order        | `POST` | `/orders`      | Creates an order.        |
| Order        | `GET`  | `/orders/{id}` | Get order details by id. |

#### Domain events

The application will emit the following domain events :

| Event                   | Publisher | Consumer |
| ----------------------- | --------- | -------- |
| `product-added-to-cart` | Catalog   | Cart     |
| `cart-validated`        | Cart      | Order    |
| `cart-expired`          | Cart      | Order    |

Now let's create the catalog microservice using Marble.js :

```ts
import { bindEagerlyTo, createServer, httpListener } from '@marblejs/core';
import { IO } from 'fp-ts/lib/IO';
import { client, ClientToken } from './client';
import { getProducts$, getProduct$ } from './effect';

const listener = httpListener({
  effects: [getProducts$, getProduct$],
});

const server = createServer({
  listener,
  dependencies: [bindEagerlyTo(ClientToken)(client)],
});

const main: IO<void> = async () => await (await server)();

main();
```

Marble.js offers an abstraction over the transport layer that lets you choose between [AMQP (RabbitMQ)]() and [Redis Pub/Sub]().

```ts
import { r, useContext, HttpStatus } from '@marblejs/core';
import { mapTo, mergeMapTo } from 'rxjs/operators';
import { ClientToken } from './client';

export const getRoot$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect((req$, ctx) => {
    const client = useContext(ClientToken)(ctx.ask);

    return req$.pipe(
      mergeMapTo(client.send({ type: 'HELLO', payload: 'John' })),
      mapTo({ status: HttpStatus.ACCEPTED }),
    );
  }),
);
```
