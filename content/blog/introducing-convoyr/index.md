---
title: Introducing Convoyr, the reactive HTTP extensions for Angular
date: '2020-05-20T00:00:00.000Z'
---

[Convoyr](https://github.com/jscutlery/convoyr) began with some discussions (and beers) with [@yjaaidi](https://twitter.com/yjaaidi) about the Angular community. At this time I was bored at my job and I wanted to push myself more in the open-source. Then we created the JScutlery organization for authoring open-source work and we started to code Convoyr.

> Convoyr has been built with one goal in mind: helping you to focus on your apps' features instead of the transport layer's boilerplate without any trade-off.

## Authentication with Interceptors

Let's start by an example. If I want to authenticate HTTP requests I should use Angular Interceptors. Here is an example grabbed from internet :

```ts
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });
    return next.handle(request);
  }
}
```

Then we should provide the `TokenInterceptor` in the `AppModule` :

```ts
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
```

I wrote this exact same thing many times, and what's wrong with it ?

- Require verbose boilerplate just for setting a request header.
- May send API token to malicious remote origins.
- It's highly repetitive between apps.

## Authentication with Convoyr

Let's see the same API authentication feature using Convoyr :

```ts
@NgModule({
  imports: [
    HttpExtModule.forRoot({
      deps: [AuthService],
      config: (auth: AuthService) => ({
        plugins: [
          createAuthPlugin({
            shouldHandleRequest: matchOrigin('https://my-secure-api.com'),
            token: auth.getToken(),
          }),
        ],
      }),
    }),
  ],
})
export class AppModule {}
```

There is no provider configuration required and security is improved with the `matchOrigin` function.

### How Convoyr was cooked

Convoyr has been built with TDD and TCR in dual programming. I recommend you to check more on [extreme programming](https://guide-agile.wishtack.io/extreme-programming) which is a kind of Agile method without the bullshits. This framework can help your team to resolve problems faster, better and stronger.

Technically we use both Nx and Lerna to manage the monorepos. The codebase is splitted in two main libraries :

- The Core which only depends on TypeScript and RxJS.
- The Angular module which makes the glue with the framework.

Making the Core agnostic from Angular allows a further compatibility with another HTTP client.

![Convoyr Schema](./schema.png)

#### Plugins

Convoyr also comes with a built-in plugin collection to handle some complex and repetitive tasks for you.

| Package                                                                                     | Description                                     |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [@convoyr/plugin-cache](https://github.com/jscutlery/convoyr/tree/master/libs/plugin-cache) | Respond with cache-then-network strategy.       |
| [@convoyr/plugin-retry](https://github.com/jscutlery/convoyr/tree/master/libs/plugin-retry) | Retry failed requests with exponential backoff. |
| [@convoyr/plugin-auth](https://github.com/jscutlery/convoyr/tree/master/libs/plugin-auth)   | Handle authentication.                          |

These plugins extends HTTP capabilities in three different axes : **security**, **performance** and **resilience**.

### Custom plugin examples

It's easy to implement its own custom plugin to handle your needs. Here are some examples.

#### Logging requests

The handler is the object where all the custom logic is put.

```ts
import { ConvoyrPlugin } from '@http-ext/core';

export const loggerPlugin: ConvoyrPlugin = {
  handler: {
    handle({ request, next }) {
      return next
        .handle({ request })
        .pipe(
          tap((response) =>
            console.log(`${request.method} ${request.url}`, response.body)
          )
        );
    },
  },
};
```

#### Logging requests with Promises

The `handle` function allows you to play with both Observables and Promises.

```ts
import { ConvoyrPlugin } from '@http-ext/core';

export const loggerPlugin: ConvoyrPlugin = {
  handler: {
    async handle({ request, next }) {
      const response = await next.handle({ request }).toPromise();
      console.log(`${request.method} ${request.url}`, response.body);
      return response;
    },
  },
};
```

However I recommend you to opt for the Observable approach since it provides a nicer API to manage asynchronous tasks.

#### Rejecting requests to unknown origins

The `shouldHandleRequest` function let you conditionally handle requests :

```ts
import { ConvoyrPlugin, not, matchOrigin } from '@http-ext/core';

export const rejectUnknownOriginsPlugin: ConvoyrPlugin = {
  shouldHandleRequest: not(matchOrigin('https://github.com')),
  handler: {
    handle({ request, next }) {
      return throwError(`🛑 requesting invalid origin. url: ${request.url}`);
    },
  },
};
```

### Further with Convoyr

We're excited to announce Convoyr. We have many other things to do like adding installation schematics or creating another plugins. Any ideas or contributions are welcome.

I hope you will find it useful.
