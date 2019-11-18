---
title: Managing subscriptions in Angular
date: '2019-11-18T12:13:45.573Z'
---

Before diving in how to manage subscriptions, let's try to define them.

In fact the Subscription represents the connection between the Observable and the Observer. When we `.subscribe()`, the Observable starts pushing values to the connected Observer.

![Subscription schema](./subscription.png)

That's why Observables are lazy, they don't produce any value before `.subscribe()` is called. Once the Subscription is made, the Observable emits values until we `.unsubscribe()`.

> A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions.

It means that if we forget to unsubscribe, the Observable will continue to produce values over and over, even if they aren't used anymore. It creates memory leaks that implies weird behaviors and finally breaks you're application very quickly.

![](./milk.mp4)

## Unsubscribe explicitly

```

```
