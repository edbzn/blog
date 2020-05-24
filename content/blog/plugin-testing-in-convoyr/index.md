---
title: Plugin Testing in Convoyr
date: '2020-05-24T00:00:00.000Z'
draft: true
---

Since testing is a one of the most important part of our development workflow when building Convoyr, we early decided to implement a dedicated module for plugin testing.

Let's get a simple plugin that log the response in the console.

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

All the logic belong in the handler and should be tested in prior. First I will create a plugin test bed for my test case.

```ts
describe('addAnswerToLifePlugin', () => {
  let pluginTester: PluginTester;

  beforeEach(() => {
    pluginTester = createPluginTester({
      handler: addAnswerToLifePlugin.handler,
    });
  });

  it.todo('should add answer of life in response body');
});
```

Then I will use the test bed for simulating an HTTP request and test my plugin against.

```ts
describe('addAnswerToLifePlugin', () => {

  /* ... */

  it('should add answer of life in response body', async () => {
    /* Simulate an HTTP call using a mock */
    const httpHandlerMock = pluginTester.mockHttpHandler({
      response: createResponse({ body: null })
    });

    /* Run the plugin and execute the fake HTTP handler */
    const response = await pluginTester.handleFake({
      request: createRequest({ url: 'https://answer-of-life.com' }),
      httpHandlerMock,
    }).toPromise();

    /* Check that the response is well transformed by the plugin */
    expect(response).toEqual(
      expect.objectContaining({
        { body: { answer: 42 } }
      })
    );
  })
})
```
