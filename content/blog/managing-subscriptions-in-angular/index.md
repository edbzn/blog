---
title: Managing subscriptions in Angular
date: '2019-11-18T12:13:45.573Z'
---

Observables are everywhere in Angular and a lot of stuff operates using them. In fact they are used to know **when** and **what** to do.

Before starting let's define the Subscription.

A Subscription is an object that represents the connection between an Observable and an Observer. This object holds the Observable execution. Observables are lazy (vs eager like Promises), which means that they don't push any value before the system `.subscribe()` to them.

![Subscription schema](./subscription.png)

As we usually do with `.addEventListener(...)` or `setInterval(...)`, the Observable execution needs to be stopped somehow to avoid memory leaks.

> A Subscription has one important method, unsubscribe, that takes no argument and just disposes the resource held by the subscription.

![Beer leak](./beer.gif)

We usually think that memory leaks are hidden and imperceptible. It's totally false, an application that contains memory leaks become quickly unusable before it entirely crashes.

It affects final users directly resulting in a poor experience. Nobody will reuse your buggy service, so don't mess with subscriptions.

## Concretely in Angular

Observables are disposable in two different ways, explicitly or implicitly.

#### Unsubscribe way

```ts
```

#### Async pipe way

```ts
```

#### TakeWhile way

```ts
```

#### Subject way

```ts
```

#### Decorator way

```ts
```
