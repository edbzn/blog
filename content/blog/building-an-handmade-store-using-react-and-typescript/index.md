---
title: Building an handmade store using React and TypeScript
date: "2019-01-13T22:40:32.169Z"
description: Today there is many state managers available Redux, MobX, Cerebral, Akita... But today we're going to implement a store by ourself by following the Meiosis pattern...
---

Today there is many state managers available: Redux, MobX, Cerebral, Akita...
But today we're going to implement a store by ourself by following the [Meiosis](https://meiosis.js.org/) pattern.

It's not a library, you can't import it, it's a powerful pattern to manage state and it works for a lot of view's library like React, CycleJS, Lit-html, VueJS, Mithril.js...

## Let's see how to implement this

For this example I'm using TypeScript and React. We're going to build the most simple application in the world: a counter. The first thing to do is to design interfaces, the signature of our program.

```typescript
export interface AppState {
  count: number;
}

export interface AppActions {
  increment(): void;
  decrement(): void;
}

export interface AppProps {
  states: Stream<AppState>;
  actions: AppActions;
}
```

Meiosis is a stream based pattern, for this example I'm using the [Flyd stream library](https://github.com/paldepind/flyd) but if you want a zero dependency state manager, you can implement the stream by yourself.

Concretely the store is a simple object containing the initial state and actions.

```typescript
export const store = {
  initialState: (): AppState => ({
    count: 0
  }),
  actions: (update: StreamUpdate): AppActions => ({
    increment() {
      update((state: AppState) => {
        ++state.count;
        return state;
      });
    },
    decrement() {
      update((state: AppState) => {
        --state.count;
        return state;
      });
    }
  })
};
```

Note that actions safely mutate the state because we're using a stream. This is big a difference with the standard immutability approach of classic state managers.

Now let's see how to build the state stream. We just need two operators: `map` and `scan`. The last one, `scan`, is the stream equivalent of `Array.prototype.reduce` function.

```typescript
export type Stream<State> = flyd.Stream<State>;
export type StreamUpdate = flyd.Stream<UpdateFunction>;

export interface UpdateFunction {
  (state: AppState): AppState;
}

const update = flyd.stream<UpdateFunction>();
const updateState = (state: AppState, patch: UpdateFunction) => patch(state);

export const actions = store.actions(update);
export const states = flyd.scan<AppState, UpdateFunction>(
  updateState,
  store.initialState(),
  update
);
```

1. The `states` stream takes our initial state using the initial value of the `scan` operator.
2. The `update` stream emits our state patches (a.k.a actions), here `increment` or `decrement`.
3. The `states` stream handles `update` emission and patch the old state with the corresponding `store` action.
4. Finally a new state is emitted in the `states` stream.

Next to this we need to pass `actions` and `states` as props to our React app.

```tsx
class App extends React.Component<AppProps, AppState> {
  state: AppState;
  props: AppProps;

  constructor(props: AppProps) {
    super(props);
    this.state = props.states();
  }

  componentDidMount(): void {
    this.props.states.map(state => {
      this.setState(state);
    });
  }

  render(): JSX.Element {
    const { count } = this.state;
    const { increment, decrement } = this.props.actions;

    return (
      <div className="App">
        <h1>count: {count}</h1>
        <button className="increment" onClick={increment}>
          Increment
        </button>
        <button className="decrement" onClick={decrement}>
          Decrement
        </button>
      </div>
    );
  }
}

render(
  <App actions={actions} states={states} />,
  document.getElementById("root")
);
```

The last state is available using the `stream.map` operator over the `states` props.
When an action is dispatched it triggers a React `setState` which automatically re-renders our view.

## Benefits

It's **library free**, when working with a state manager we're writing a lot of library's specific code to do something. For example with Redux:

* installing and maintaining some dependencies (Thunk, Saga...)
* writing `import` or `require` everywhere
* setting up plugins and middlewares
* adding connectors to bind views to the state

> It makes the view layer tiny coupled with the state library and bring many problems when you need to change or update these libraries.

With Meiosis we're importing nothing to the view. **Actions** and **states** are passed to our app as props, these are just plain JavaScript functions and objects. We're not maintaining a bunch of dependencies, we have a full control on what's going on in our application.

**It's transparent**, state managers like Redux are doing a lot of stuff behind the scene. As you saw Meiosis can be fully implemented in a couples of 30 lines of code. It really forces you to think about how to design the state and not how to deal with tools.

* We have a root state in our app which is the single source of truth.
* The code is deterministic, we can run it many times it's gonna render exactly the same thing.
* We know exactly what's going to happen because all of the code was written by ourself.

Here is the [complete working example](https://codesandbox.io/s/0193mp6kmp).

## Final note

Meiosis offers a [small package](https://github.com/foxdonut/meiosis-tracer) to time travel across states like the Redux extension. There is a lot of really good tutorials and examples directly on the [Meiosis website](https://meiosis.js.org).

To conclude, learning Meiosis was a good way for me to deep dive into functional and reactive programming.

