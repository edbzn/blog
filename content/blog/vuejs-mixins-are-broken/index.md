---
title: Vue.js mixins are broken
date: '2020-08-01T00:00:00.000Z'
---

Vue.js comes with its mixin concept **to share logic between components**, this way we can extract common properties into a separate module.

```js
export default {
  data: () => ({
    users: [],
  }),
  methods: {
    async getUsers() {
      const response = await fetch('/api/users');
      this.users = await response.json();
    },
  },
};
```

Then we can extend our component to use this mixin.

```js
import UserMixin from './user-mixin';

export default {
  mixins: [UserMixin],
  data: () => ({
    isVisible: false,
  }),
  methods: {
    toggle() {
      this.isVisible = !this.isVisible;
    },
  },
};
```

Which result in the following runtime component definition.

```js
export default {
  data: () => ({
    users: [],
    isVisible: false,
  }),
  methods: {
    async getUsers() {
      const response = await fetch('/api/users');
      this.users = await response.json();
    },
    toggle() {
      this.isVisible = !this.isVisible;
    },
  },
};
```

At the beginning the mixin pattern seem to work well for sharing code, but it quickly shows its limits. Let's see why.

### Mixins break encapsulation

It's possible that some mixins cannot be used together. For example if two mixins declare the same method `doSomething()`, it will break. The last declared mixin wins. Also the component cannot define its own `doSomething()` method.

It's quite difficult to fix name collisions because we need first to refactor the mixin, then find and refactor all the consuming components and mixins, which can be very complicated in a big project.

**Once used a mixin is hard to change, hard to refactor.**

### Complexity snowballing

It's impossible to know from the template part if a property or a method comes from the component itself or from a mixin. The relation between components and mixins is implicit.

It increases the mental charge to find what's wrong if there is a bug. Where does the problem come from? The component? A mixin? Which one?

**We’d have to manually search them all to know**.

The more we use mixins in a project the more it becomes hard to reason about how components and mixins are coupled.

### Others alternatives we have

#### Using an ES module

My preferred solution if the function isn't doing anything Vue specific is simply using an ES module to share it across components.

```js
export async function getUsers() {
  const response = await fetch('/api/users');
  return await response.json();
}
```

Then we can just import it in our components.

```html
<template>
  <section>
    <div v-for="user in users" :key="user.id">{{ user.name }}</div>
  </section>
</template>

<script>
  import { getUsers } from './user';

  export default {
    data: () => ({
      users: [],
    }),
    async mounted() {
      this.users = await getUsers();
    },
  };
</script>
```

It also simplifies the way we test our function, it's more easy to test a function than a mixin, there's no need to create a test component using `@vue/test-utils`.

#### Using composition API

The new fancy way to share code between components is using the functional [composition API](https://composition-api.vuejs.org/) which is compatible with both Vue 2 and 3. 

After the library gets correctly installed we can create **reusable chunks of code called hooks**.

```js
import { ref, onMounted } from '@vue/composition-api';

export const useGetUsers = () => {
  const users = ref([]);

  onMounted(async () => {
    const response = await fetch('/api/users');
    users.value = await response.json();
  });

  return users;
};
```

Now inside the `setup` function I can call my `useGetUsers` hook and bind it to the view. Here I can compose with many hooks.

```html
<template>
  <section>
    <div v-for="user in users" :key="user.id">{{ user.name }}</div>
  </section>
</template>

<script>
  import { useGetUsers } from 'use-get-users';

  export default {
    setup() {
      const users = useGetUsers();
      /* Expose to template */
      return { users };
    },
  };
</script>
```

It's easy to use my `useGetUsers` everywhere I need it. Everything inside hooks is encapsuled. Dependencies are explicit. It scales well for a huge enterprise application.