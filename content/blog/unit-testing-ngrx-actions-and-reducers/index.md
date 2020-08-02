---
title: Unit testing NgRx actions and reducers
date: '2019-01-17T00:00:00.000Z'
---

When using the Redux pattern along NgRx and Angular most of the application logic goes in actions and reducers. 

The state is the **application lifeblood**, the most critic part. If it gets into a wrong unexpected state, it will directly affect users.

 That's why unit testing this part is essential, let's see how.

```typescript
describe('Product reducer', () => {
  const initialState = {
    products: [],
    loading: false,
    error: null,
  };

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = { type: undefined };
      const result = Product.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
```

A reducer is a **pure function** that is easy to invoke just by passing an initial state and an action.

The code above checks if an unknown action will produce something else than returning the previous state. It should not.
For readability in the console output all tests are grouped in the same describe function.

```typescript
describe('load products action', () => {
  it('should toggle the loading state', () => {
    const action = new LoadProductsAction({ offset: 10 });

    const result = Product.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });
});
```

Now we're checking what's commonly done in web applications : doing asynchronous HTTP stuff and displaying something graceful while fetching.

Here the `LoadProductsAction` represents the initialization of this work-flow. When dispatched it should toggle the loading state and clearing error if any.

```typescript
describe('load products success action', () => {
  it('should add products and toggle the loading state', () => {
    const fakeResponse = {
      products: Array(10).fill({
        name: 'Edgar Allan Poe books collection',
        remainingQuantity: 5000,
        price: 50.0,
      }),
    };
    const action = new LoadProductsSuccessAction(fakeResponse);

    const result = Product.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      products: [...fakeResponse.products],
      loading: false,
    });
  });
});
```

Destructuring assignment is used to build the expected state object. Here if the `LoadProductsSuccessAction` is dispatched it should set the loading property to `false` and add given products to the state.

It's quite easy to test reducers because nothing needs to be mocked except action payload.

```typescript
describe('load products success action', () => {
  it('should add products and toggle the loading state', () => {
    const fakeResponse = { message: 'Failed to load products' };
    const action = new LoadProductsFailureAction(fakeResponse);

    const result = Product.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
	  error: fakeResponse.message,
      loading: false,
    });
  });
});
```

Because an action modifies the state in a predictable way, we can quickly and easily cover all of this logic without doing any UI testing.