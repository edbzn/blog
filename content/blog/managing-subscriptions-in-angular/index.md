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

To illustrate how to manage Subscription in Angular

#### Common pitfall

This implementation has a memory leak, the subscription is not managed.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul class="list" *ngIf="books">
      <li *ngFor="let book of books; trackBy: trackById">
        <strong>{{ book.title }}</strong>
      </li>
    </ul>
  `,
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.availableBooks$.subscribe(list => {
      this.books = list;
    });
  }

  trackById(index: number, book: Book) {
    return book.id;
  }
}
```

If this component is destroyed the Subscription keep alive.

#### Subscription reference

Here is the common memory safe approach using a Subscription reference.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul class="list" *ngIf="books">
      <li *ngFor="let book of books; trackBy: trackById">
        <strong>{{ book.title }}</strong>
      </li>
    </ul>
  `,
})
export class BookListComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  books: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this._subscription = this.bookService.availableBooks$.subscribe(books => {
      this.books = books;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  trackById(index: number, book: Book) {
    return book.id;
  }
}
```

The Subscription is managed manually and requires extra work from the developer.

#### Subject + takeUntil way

An other approach is to use a Subject to notify whenever the component is destroyed in combination with to `takeUntil` operator to cleanup the Observable.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul class="list" *ngIf="books">
      <li *ngFor="let book of books; trackBy: trackById">
        <strong>{{ book.title }}</strong>
      </li>
    </ul>
  `,
})
export class BookListComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  books: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.availableBooks$
      .pipe(
        tap(books => {
          this.books = books;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  trackById(index: number, book: Book) {
    return book.id;
  }
}
```

No need to call `this._destroy$.complete()` because the Subject with no subscriber is just a function.

This implementation still looks bad because we need to add extra logic to cleanup the execution.

#### Async pipe way

Angular comes with a powerful pipe `async` that manage the Subscription for us.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul class="list">
      <li *ngFor="let book of books$ | async; trackBy: trackById">
        <strong>{{ book.title }}</strong>
      </li>
    </ul>
  `,
})
export class BookListComponent {
  books$: Observable<Book[]> = this.bookService.availableBooks$;

  constructor(private bookService: BookService) {}

  trackById(index: number, book: Book) {
    return book.id;
  }
}
```

This approach looks significantly better. It removes a lot of code:

- no property check in the template, `*ngIf="books"` removed in favor of `async`.
- no additional property, the intend is clear through the `books$` property.
- automated unsubscribe handled by the pipe.

#### Decorator way

```ts
```
