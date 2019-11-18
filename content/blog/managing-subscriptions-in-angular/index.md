---
title: Managing subscriptions in Angular
date: '2019-11-18T12:13:45.573Z'
---

Before diving into managing subscriptions, let's define what they are.

In fact the Subscription represents the connection between the Observable and the Observer. When we `.subscribe()`, the Observable starts pushing values to the connected Observer.

![Subscription schema](./subscription.png)

That's why Observables are lazy, they don't produce any value before we `.subscribe()` to them. Once the Subscription is made the Observable emits values until `.unsubscribe()` is called.

> A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions.

It means that if we forget to unsubscribe, the Observable will produce values over and over, consuming indefinitely more resources. These memory leaks cause weird side effects and finally crash the entire application.

![Beer leak](./beer.gif)

Now you know, don't mess with subscriptions.

## Concretely in Angular

Observables are everywhere, we use them to know when and what to do. Listening form changes, fetching data... all that stuff operates in Observables so managing Subscriptions is challenging when building Angular applications.
