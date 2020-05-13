---
title: Practical client-side DDD using Angular and Nx monorepos
date: '2020-05-08T00:00:00.000Z'
---

> Disclaimer : this post is opinionated since everyone fails to clearly defines me how to implement DDD. Sometimes it's all about perspective.

Some years ago I worked for the first time with Domain-Driven Design on back-end applications. We painfully discovered that **managing DDD architecture requires tools and shared knowledge** between team members.

Today DDD is coming in the client-side application world and I recently started to work on project built with it, here are my thoughts.

## Required toolbox

The first thing that comes in mind with DDD is **domain definition and layers organization**. Here are tools needed in prior to achieve this :

- an [Nx monorepos](https://nx.dev) to organize and manage the whole project
- whatever CI pipeline to build, test and deploy each layer independently

Since DDD is about keeping a maintainable architecture over time, I strongly discourage you to start modeling your application without these tools configured in your project.

## Code organization

Most of the challenges are in code organization. The main goal is to **keep domains tightly coupled between each others**. This helps a lot to avoid spaghetti code and improve maintainability.

A domain is a logical piece in your software that reflect a reality. An order, a cart, a product are common domains examples.

![DDD code organization schema](./ddd.png)

Note that each block is an **independent library**, expect the bottom line that is a single core library that holds all the domain logic.

From our point of view it's better to stick domain, infrastructure and application layers together into a single domain library. It makes testing less complex and drastically reduce the boilerplate.

Most of the challenges are in a good domain definition. Trying to make domain agnostic from data access or state management is a waste of time.

### Types of layers

A domain is separated in the following libraries :

| Type    | Description                                             | Example          |
| ------- | ------------------------------------------------------- | ---------------- |
| UI      | A set of dumb reusable components.                      | `<product-item>` |
| Feature | Single usage smart component.                           | `<catalog-page>` |
| Core    | Domain code including data access and state management. | `ProductModel`   |
| API     | Exposed code to the outside world.                      | `ProductModule`  |

### Access restriction rules

For keeping layers tightly coupled we need [access restrictions](https://www.angulararchitects.io/aktuelles/sustainable-angular-architectures-2#check-accesses-to-libraries) between layers. These rules protect your domains from being involuntary coupled with something else.

Of course, we need to add interactions between domains. Obviously a cart has relations with products, but we will use an interface between them to establish a clear contract that reflect the use-cases.

The main benefit is that **complexity will not grow exponentially over time**. The downside is that it starts with a relative complex organization from the beginning. That's why DDD should not be applied blindly.
