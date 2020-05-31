---
title: Plugin Testing in Convoyr
date: '2020-05-31T00:00:00.000Z'
---

> Testing is a one of the most important part of any modern development workflow. Convoyr is built with a dedicated module for plugin testing, let's see how to use it.

## Promise based testing

Let's build a simple plugin that fill the response `body` with an object containing the answer of life.

```ts
const addAnswerToLifePlugin: ConvoyrPlugin = {
  handler: {
    handle({ request, next }) {
      return next({ request }).pipe(
        map((response) => ({
          ...response,
          body: { answer: 42 },
        }))
      );
    },
  },
};
```

All the plugin logic is hold in the handler and should be tested in prior. To do this I create a `PluginTester` for my test-case.

```ts
import { PluginTester, createPluginTester } from '@convoyr/core/testing';

describe('addAnswerToLifePlugin', () => {
  let pluginTester: PluginTester;

  beforeEach(() => {
    pluginTester = createPluginTester({
      plugin: addAnswerToLifePlugin,
    });
  });

  it.todo('should add answer of life in response body');
});
```

Firstly I mock the final HTTP handler with a fake response using the `createHttpHandlerMock` function.

Then I execute the plugin using the `handleFake` function.

```ts
it('should add answer of life in response body', async () => {
  /* Arrange */
  const httpHandlerMock = pluginTester.createHttpHandlerMock({
    response: createResponse({ body: null }),
  });

  /* Act */
  const response = await pluginTester
    .handleFake({
      request: createRequest({ url: 'https://answer-of-life.com' }),
      httpHandlerMock,
    })
    .toPromise();

  /* Assert */
  expect(response).toEqual(
    expect.objectContaining({
      { body: { answer: 42 } }
    })
  );
});
```

Finally I check if the answer to the life was added to my original empty response.

_Note that I use the RxJS `toPromise` function with the `async` `await` syntax to simplify this test-case by making it synchronous like._

## Observable based testing

Let's imagine an other plugin that throw if the requested origin is unknown.

```ts
export const rejectUnknownOriginsPlugin: ConvoyrPlugin = {
  shouldHandleRequest: not(matchOrigin('https://www.codamit.dev')),
  handler: {
    handle({ request }) {
      return throwError(`🛑 Requesting invalid origin, url: ${request.url}`);
    },
  },
};
```

Now I need to test if the observer `error` callback has been called on the response stream when the origin is rejected.

```ts
describe('rejectUnknownOriginsPlugin', () => {
  let pluginTester: PluginTester;

  beforeEach(() => {
    pluginTester = createPluginTester({
      plugin: rejectUnknownOriginsPlugin,
    });
  });

  it('should reject unknown origins', () => {
    /* Arrange */
    const httpHandlerMock = pluginTester.createHttpHandlerMock({
      response: createResponse({ body: null }),
    });
    const observer = {
      next: jest.fn(),
      error: jest.fn(),
    };

    /* Act */
    pluginTester
      .handleFake({
        request: createRequest({ url: 'https://rejected-origin.com' }),
        httpHandlerMock,
      })
      .subscribe(observer);

    /* Assert */
    expect(httpHandlerMock).not.toHaveBeenCalled();
    expect(observer.next).not.toHaveBeenCalled();
    expect(observer.error).toHaveBeenCalledTimes(1);
    expect(observer.error).toHaveBeenCalledWith(
      `🛑 Requesting invalid origin, url: https://rejected-origin.com`
    );
  });
});
```

I also check that the final HTTP handler has not been called since this plugin does not execute the `next` handler if the origin is unknown.

## Marbles testing

For some more complex use-cases were the plugin emits more than one notification it could be better to do marbles testing. Take this example which retries failed requests.

```ts
const MAX_RETRY_ATTEMPTS = 3;
export const retryPlugin: ConvoyrPlugin = {
  handler: {
    handle({ request, next }) {
      return next.handle({ request }).pipe(
        retryWhen((attempts) =>
          attempts.pipe(
            switchMap((error, i) => {
              const retryAttempt = i + 1;

              /* Stop retrying if max retry attempts reached */
              if (retryAttempt > MAX_RETRY_ATTEMPTS) {
                return throwError(error);
              }

              /* Otherwise retry after 1s, 2s, 3s, etc... */
              return timer(retryAttempt * 1000);
            })
          )
        )
      );
    },
  },
};
```

Note that I set the `frameTimeFactor` below to make each marble symbol representing 1 second to match the plugin time factor.

```ts
it(
  'should retry failed request 3 times with an increased delay',
  marbles((m) => {
    /* Arrange */
    TestScheduler['frameTimeFactor'] = 1000;
    const response = createResponse({
      status: 500,
      statusText: 'Internal Server Error',
    });
    const httpHandlerMock = pluginTester.createHttpHandlerMock({
      response: m.cold('#', undefined, response),
    });

    /* Act */
    const response$ = pluginTester.handleFake({
      request: createRequest({ url: 'https://origin.com' }),
      httpHandlerMock,
    });

    /* Assert
                                   👇 Throws after 3 retries in a total of 6s */
    const expected$ = m.cold('------#', undefined, response);
    m.expect(response$).toBeObservable(expected$);
    m.expect(httpHandlerMock()).toHaveSubscriptions([
      '(^!)' /*       Initial call at 0ms */,
      '-(^!)' /*      1st retry at 1000ms */,
      '---(^!)' /*    2nd retry at 3000ms (1st retry delay 1000ms + 2000ms) */,
      '------(^!)' /* 3rd retry at 6000ms (2nd retry delay 3000ms + 3000ms) */,
    ]);
  })
);
```

Marbles testing makes complex asynchronous testing possible and efficient. But as you can see it's not the simplest solution, that's why I use it only if the two previous approaches are ineffective for my test-case.

## To recapitulate

There is three ways for testing a plugin :

- the async await approach which should be the first choice since it looks like completely synchronous,
- the spy observer approach which is useful for checking for `next`, `error` or `complete` notification.
- the marbles approach which is recommended if the plugin emits more than one notification with complex asynchronous logic.
