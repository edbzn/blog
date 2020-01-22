---
title: Eager vs Lazy in RxJS
date: '2020-01-21T00:00:00.000Z'
---

I made a mistake many times in RxJS when I use a function to perform a side effect in a stream.

The following factory function creates a `Book` object.

```ts
function createBook({ title, description }): Observable<Book> {
  return of({ title, description });
}
```

I want to use this function in a pipeline, let's imagine an HTTP based web application.

```ts
fromRoute('/book', 'POST').pipe(
  switchMap(({ title, description }) => createBook({ title, description })),
  map(book => ({ status: 204, body: book }))
);
```

Here it's fine, the book is created only when the `/book` endpoint is hit. That's because we're just returning an observable with no side effects.

But imagine a real case scenario where we need to perform a side effect operation using a database.

```ts
class BookDAO {
  static create({ title, description }): Observable<Book> {
    return from(
      DB.create({ title, description } // 👈 Book created eagerly
    );
  }
}

fromRoute('/book', 'POST').pipe(
  switchMap(({ title, description }) =>
    BookDAO.create({ title, description }) // ❌ Book created at route evaluation
  ),
  map(book => ({ status: 204, body: book }))
);
```

Here the book is created in the database as soon as we bootstrap the server, before the source emits any values. That's because the `create` method returns a Promise which is eagerly executed.

To fix this issue we need to `defer` the operation, for creating the observable only when the source is subscribed.

```ts
class BookDAO {
  static create({ title, description }): Observable<Book> {
    return defer(() => from(
        DB.create({ title, description }) // 👈 Book creation is deferred
      );
    );
  }
}

fromRoute('/book', 'POST').pipe(
  switchMap(({ title, description }) =>
    BookDAO.create({ title, description }) // ✔️ Book created lazily
  ),
  map(book => ({ status: 204, body: book }))
);
```

Now the `create` method is lazy, which means that the resource is created only when the `/book` endpoint is hit.

I have seen this mistake many times, especially when a function is used to produce a stream that perform a side effect.
