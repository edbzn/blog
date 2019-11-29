---
title: Managing subscriptions in Angular
date: '2019-12-01T12:13:45.573Z'
---

Observables are everywhere in Angular and a lot of stuff operates using them. In fact they are used to know **when** and **what** to do.

Before starting let's define the Subscription.

A Subscription represents the connection between an Observable and an Observer. It's an object that holds the Observable execution.

![Subscription schema](./subscription.png)

Observables are lazy which means that they don't push any value before the system `.subscribe()` to them. Once the system subscribes, the Observable push one or multiple values to the connected Observer.

As we usually do with Event Listeners or `setInterval()` function, the Observable execution needs to be stopped to avoid memory leaks. The Subscription has one important method `.unsubscribe()` that disposes the resource.

We usually think that memory leaks are hidden and imperceptible. By the way it's completely wrong. An application that leak becomes quickly unusable before it entirely crashes.

![Beer leak](./beer.gif)

This problem directly affects final users and results in a poor experience.

## Concretely in Angular

There are many ways to manage Subscriptions in Angular. The following example uses a `BookService` which exposes a long-lived Observable `availableBooks$` that emits real time changes.

Next to this imagine we want to display this list and automatically update the view whenever the Observable emits a change.

#### ❌ Common pitfall

Let's start by the bad way, this implementation has a memory leak.

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

  trackById(index: number, book: Book): string {
    return book.id;
  }
}
```

When this component is destroyed the Observable keeps running forever, consuming more resources each time the component is recreated.

#### 👎🏼 Referenced Subscription

To fix the leak there is a common approach using a Subscription reference.

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

  trackById(index: number, book: Book): string {
    return book.id;
  }
}
```

The Subscription is manually managed and requires some extra work from the developer. This implementation looses the reactivity in favor of imperative programming with side-effects which is exactly what we want to avoid.

#### 👎🏼 Subject + takeUntil way

An other approach is to use a `Subject` to notify whenever the component is destroyed in combination with `takeUntil` operator to cleanup the Observable execution.

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

  ngOnInit(): void {
    this.bookService.availableBooks$
      .pipe(
        tap(books => {
          this.books = books;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  trackById(index: number, book: Book): string {
    return book.id;
  }
}
```

This implementation still looks bad because some extra logic needs to be added to cleanup the Observable execution.

> Note that no need to call `this._destroy$.complete()` when destroyed because the Subject with no subscriber is just a function.

#### 👍🏼 Async pipe way

Angular natively comes with the powerful `async` pipe to manage view Subscriptions effortlessly.

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

  trackById(index: number, book: Book): string {
    return book.id;
  }
}
```

This approach removes a lot of code and looks significantly better.

- no additional checks in the template.
- no additional component property.
- automated subscription management.

#### 👍🏼 Decorator way

Sometimes the `async` pipe is not enough.

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
  changeDetector: ChangeDetectorRef.OnPush,
})
export class BookListComponent implements OnInit {
  books$: Observable<Book[]> = this.bookService.availableBooks$;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  trackById(index: number, book: Book): string {
    return book.id;
  }
}
```

## 💡 Tips for further

- Delegate subscription management.
- Avoid logic in `.subscribe()`.
- Avoid subscription in services.
- Avoiding nested subscribes.
- Don’t pass streams to components directly.

`oembed: https://twitter.com/Michael_Hladky/status/1180316203937681410`

I close this post with this smart quote from Michael Hladky. I strongly suggest you to follow this guy if you're interested in the Reactive X world, he's consistently publishing interesting stuff.
