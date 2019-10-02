---
title: Building a reactive store using React and TypeScript
date: "2019-01-13T22:40:32.169Z"
description: Today we're going to implement a reactive store by ourself using the Meiosis pattern
---

Today we're going to implement a reactive store by ourself using the [Meiosis](https://meiosis.js.org/) pattern.

It's not a library, you can't import it, it's a powerful pattern to manage state. It works for a lot of view's library like React, CycleJS, Lit-html...

## Let's see how to implement this

We're going to build the most simple application in the world: a counter. The first thing to do is designing our interfaces, the signature of our program.

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

Meiosis is a stream based pattern, for this example I'm using the [Flyd stream library](https://github.com/paldepind/flyd) but it's possible to not rely on any dependency by implementing the stream by yourself along two other operators that I will describe later.

Concretely the store is a simple object containing the initial state and actions. Here is the power of Meiosis, we're dealing with plain objects and functions.

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

Note that actions are safely mutating the state. This is worth compared to the standard immutability approach that brings a lot of complexity between state transitions. There is no need to leverage deep understanding of immutable functions. It keeps our state transitions simple as stupid.

Now let's see how to build the state stream. As I said before, we need only two operators to create our stream: `map` and `scan`. The last one, `scan`, is the stream equivalent of `Array.prototype.reduce` function.

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

1. The `states` stream takes our initial state using the `scan` operator.
2. The `update` stream emits our actions, here `increment` or `decrement`.
3. The `states` stream handles `update` emission and patches the old state and return the new state.
4. The new state is emitted in the `states` stream.

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
Any dispatched action triggers a React `setState` which automatically re-renders our view.

## Benefits

It's **library free**, when working with a state manager we're writing a lot of library's specific code to do something. For example with Redux:

* installing and maintaining some dependencies (Thunk, Saga...)
* writing `import` or `require` everywhere
* setting up plugins and middlewares
* adding connectors to bind views to the state

> It makes the view layer tiny coupled with the state library and bring many problems when you need to change or update these libraries.

With Meiosis we're importing nothing to the view. **actions** and **states** are passed to our app as props, these are just plain JavaScript functions and objects. We're not maintaining a bunch of dependencies, we have a full control on what's going on in our application.

**It's transparent**, state managers like Redux are doing a lot of stuff behind the scene. As you saw Meiosis can be fully implemented in a couples of 30 lines of code. It really forces you to think about how to design the state and not how to deal with tools.

* We have a root state in our app which is the single source of truth.
* The code is deterministic, we can run it many times it's gonna re-render exactly the same thing.
* We know exactly what's going to happen because all of the code was written by ourself.

Here is the [complete working example](https://codesandbox.io/s/0193mp6kmp).

## Final note

Meiosis offers a [small package](https://github.com/foxdonut/meiosis-tracer) to time travel across states like the Redux extension, it's a good catch for development purpose.

I highly recommend you to visit the [Meiosis website](https://meiosis.js.org), there is good tutorials and examples on it. They go deeper than I did, it's really interesting.

To conclude I'm not trying to convince you to drop any state manager you're actually using but in my opinion this exercise can helps you to think reactively using a functional pattern.
