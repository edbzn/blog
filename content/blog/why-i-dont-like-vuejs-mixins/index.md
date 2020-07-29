---
title: Why I don't like Vue.js mixins
date: '2020-08-30T00:00:00.000Z'
draft: true
---

Vue.js comes with its mixin concept **to share logic between components**, this way we can extract common properties into a separate module.

```js
export default {
  data: () => ({
    visible: false,
  }),
  methods: {
    toggle() {
        this.isVisible = !this.isVisible;
     }
  }
}
```

Then we can extend our component to use this mixin.

```js
import Toggle from './toggle.js';

export default {
  mixins: [Toggle],
  data: () => ({
    items: [],
  }),
  methods: {
    getItems() { /* ... */ },
  },
};
```

Which result in the following runtime component definition.

```js
export default {
  data: () => ({
    items: [],
    visible: false,
  }),
  methods: {
    getItems () { /* ... */ },
    toggle() {
      this.isVisible = !this.isVisible;
    }
  },
}
```

At the beginning this solution seems to work well for sharing code, but it quickly shows its limits. Let's see why.

### Breaks encapsulation

It's possible that two mixins cannot be used together. For example if two mixins declare the same method `doSomething()`, it will break. The last delcared mixin winws, also the component cannot define its own `doSomething()` method.

It's quite difficult to fix name collisions because we need first to refactor the mixin, then find and refactor all usages from components or other mixins, which can be very complicated (if not impossible) in a big project. **Once used a mixin is hard to change, hard to refactor.**

And what can I do if the collision comes from a third-party library?

### Tends to increase complexity

A mixin hides its implementation from the component. It's impossible to know grom the template part if a property comes from the component itself or from a mixin, it's implicit.

It tends to increase the mental charge to find what's wrong in a component. Where does the problem come from? The component? A mixin? Which one? **We’d have to manually search them all to know**.

<!-- > Low coupling is often a sign of a well-structured computer system and a good design. -->

<!-- ## Possible alternatives -->

<!-- For shared utility functions, I just export a JavaScript function from a file and import it where I need to use it.

If the function isn’t doing anything Vue specific, there’s no need to use the Vue framework to share the function. -->