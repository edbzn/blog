---
title: Introducing Convoyr, the HTTP extensions for Angular
date: '2020-05-20T00:00:00.000Z'
---

[Convoyr](https://github.com/jscutlery/convoyr) began with long discussions (and beers) with [@yjaaidi](https://twitter.com/yjaaidi) about the Angular community. At this time I was bored at my job and I canted to push myself more in the open-source. We created the JScutlery organization for authoring open-source work and we started to code.

Convoyr has been built with one goal in mind: helping you focus on your apps' features instead of the transport layer's boilerplate and matters... and without any trade-off.

## Authentication with Interceptors

If I want to add custom logic to HTTP requests I can use Interceptors. Here is an example grabbed from internet to authenticate API requests :

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

Then we must provide the `TokenInterceptor`:

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

What's wrong with Interceptors approach :

- require verbose boilerplate just for setting a request header
- may send API token to malicious remote origins
- it's highly repetitive between apps

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

Convoyr brings an higher abstraction over Interceptors and lets you focus on what's matter. To achieve this Convoyr is splitted in three different layers :

- the Core module which handle declared plugins
- the built-in plugin collection that extends HTTP capabilities
- the Angular module which makes the glue with the `HttpClient`

### Custom plugin examples

Convoyr comes with its [built-in plugin collection](), however it's easy to implement its own plugin. Here are some examples.

#### Logging requests

The handler is an object where the custom logic is put. It needs to implement the `PluginHandler` interface.

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

Convoyr supports
