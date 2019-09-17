---
title: Building an handmade store using the Meiosis pattern
date: "2015-05-28T22:40:32.169Z"
description: There are plenty alternatives to a state manager Redux, MobX, Cerebral, React Context, Apollo, Akita… But one takes my attention recently.
---

There are plenty alternatives to a state manager : Redux, MobX, Cerebral, React Context, Apollo, Akita... 
But one takes my attention recently. 

It's not a library, you can't import it. It's a powerful pattern called [Meiosis](https://meiosis.js.org/).

It works for every **virtual-DOM** based view library like React, Preact, Lit-html, VueJS...

## Library free

When working with a state manager we're writing a lot of library's specific code to do something. 

For exemple with Redux :

* installing and maintaining some dependencies (Thunk, Saga...)
* writing `import` or `require` everywhere
* setting up plugins and middlewares
* adding connectors to bind our view to the state

> It makes the view layer tiny coupled with the state library and bring many problems when it's time to update these libraries.

With Meiosis we're importing nothing to the view. **Actions** and **state** are passed to our view as props. These are just plain JavaScript objects and functions.

We're not maintaining a dozen of dependencies. We just have a full control on what's going on in our application.

## No black magic

Redux is doing a lot of stuff behind the scene. Meiosis can be fully implemented by the hand in a couples of 30 lines of code. 

Also it really forces you to think about how to design the state and not how to deal with tools.

No more mystery. No need to dig in library source code to understand why this weird behavior happened.

## Let's implement the pattern

I'm using React and TypeScript for this example and we're going to implement the most easiest application in the world, a counter.

When dealing with TypeScript the first thing to do is designing our base interfaces, the signature of our program.

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

Meiosis is a stream based pattern. For this example I'm using the **Flyd** stream library.

```typescript
import * as flyd from "flyd";

export type Stream<State> = flyd.Stream<State>;
export type StreamUpdate = flyd.Stream<UpdateFunction>;

export interface UpdateFunction {
  (state: AppState): AppState;
}
```

If you want a zero dependency state manager, you can implement the stream by yourself.

Meiosis just needs two operators to work: `map` and `scan`. The last one, `scan`, is the stream equivalent of `Array.prototype.reduce` function.

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

Now let's create the state stream, where each dispatched action emit a new state.

```typescript
const update = flyd.stream<UpdateFunction>();
const updateState = (state: AppState, patch: UpdateFunction) => patch(state);

export const actions = store.actions(update);
export const states = flyd.scan<AppState, UpdateFunction>(
  updateState,
  store.initialState(),
  update
);
```

1. The `scan` function takes our `store.initialState()` as initial stream value.
2. When the user dispatch an action the `update` stream emits a new action. Here `increment` or `decrement`.
3. Then it patches the old state with `updateState` function and emits a new state in the `states` stream.

Next to this, we need to pass `actions` and `states` as props to our React app.

```typescript
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

The current state is passed in the root component by the `stream.map` function at component initialization.
The state is updated when an action is dispatched and it triggers a React `setState` which automatically re-renders our view.

## Benefits

* We have a root state in our app which is the single source of truth.
* The code is deterministic, we can run it many times it's gonna render exactly the same thing.
* We know exactly what's going to happen because all of the code was written by ourself.

Here is the [complete working example](https://codesandbox.io/s/0193mp6kmp).

## Moreover

Meiosis offers a [small package](https://github.com/foxdonut/meiosis-tracer) to time travel across states like the Redux extension.
To learn stuff about this, there is a lot of really good tutorials and examples directly on the [Meiosis website](https://meiosis.js.org).

To conclude, learning Meiosis is a good way to deepdive into functional and reactive programming.

