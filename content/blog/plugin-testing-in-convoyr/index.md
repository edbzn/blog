---
title: Plugin Testing in Convoyr
date: '2020-05-30T00:00:00.000Z'
draft: true
---

> Testing is a one of the most important part of development workflow. Convoyr is built with a dedicated module for plugin testing, let's see how to use it.

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

All the plugin logic is hold in the handler and should be tested in prior. To do this I create a `PluginTester` for my test case passing the plugin handler.

```ts
import { PluginTester, createPluginTester } from '@convoyr/core/testing';

describe('addAnswerToLifePlugin', () => {
  let pluginTester: PluginTester;

  beforeEach(() => {
    // highlight-start
    pluginTester = createPluginTester({
      handler: addAnswerToLifePlugin.handler,
    });
    // highlight-end
  });

  it.todo('should add answer of life in response body');
});
```

Then I mock the final HTTP handler with a fake response using the `mockHttpHandler` function.

```ts
it('should add answer of life in response body', async () => {
  // highlight-start
  const httpHandlerMock = pluginTester.mockHttpHandler({
    response: createResponse({ body: null }),
  });
  // highlight-end

  /* ... */
});
```

Now I run the plugin and execute the fake HTTP handler using the `handleFake` function.

```ts
it('should add answer of life in response body', async () => {
  const httpHandlerMock = pluginTester.mockHttpHandler({
    response: createResponse({ body: null }),
  });

  // highlight-start
  const response = await pluginTester
    .handleFake({
      request: createRequest({ url: 'https://answer-of-life.com' }),
      httpHandlerMock,
    })
    .toPromise();
  // highlight-end

  /* ... */
});
```

Note that I use the RxJS `toPromise` with `async` `await` syntax to simplify the test case by making it synchronous like.

```ts
it('should add answer of life in response body', async () => {
  const httpHandlerMock = pluginTester.mockHttpHandler({
    response: createResponse({ body: null }),
  });

  const response = await pluginTester
    .handleFake({
      request: createRequest({ url: 'https://answer-of-life.com' }),
      httpHandlerMock,
    })
    .toPromise();

  // highlight-start
  expect(response).toEqual(
    expect.objectContaining({
      { body: { answer: 42 } }
    })
  );
  // highlight-end
});
```

Finally I check if the answer to the life was added to my original empty response.

## Observable based testing

Let's imagine an other plugin that throw if the requested origin is unknown.

```ts
export const rejectUnknownOriginsPlugin: ConvoyrPlugin = {
  shouldHandleRequest: not(matchOrigin('https://www.codamit.dev')),
  handler: {
    handle({ request, next }) {
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
      handler: rejectUnknownOriginsPlugin.handler,
    });
  });

  it('should reject unknown origins', () => {
    const httpHandlerMock = pluginTester.mockHttpHandler({
      response: createResponse(),
    });
    const spyObserver = {
      next: jest.fn(),
      error: jest.fn(),
    };

    const response$ = pluginTester.handleFake({
      request: createRequest({ url: 'https://rejected-origin.com' }),
      httpHandlerMock,
    });

    response$.subscribe(spyObserver);

    expect(httpHandlerMock).not.toHaveBeenCalled();
    expect(spyObserver.next).not.toHaveBeenCalled();
    expect(spyObserver.error).toHaveBeenCalledTimes(1);
    expect(spyObserver.error).toHaveBeenCalledWith(`
    Error: 🛑 Requesting invalid origin, url: https://rejected-origin.com
  `);
  });
});
```

I also check that the final HTTP handler has not been called since this plugin does not execute the `next` handler if the origin is unknown.
