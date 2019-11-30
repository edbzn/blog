---
title: Managing subscriptions in Angular
date: '2019-12-01T12:13:45.573Z'
---

Observables are everywhere in Angular and a lot of stuff operates using them. In fact they are used to know **when** and **what** to do.

Before starting let's define the Subscription.

A Subscription represents the connection between an Observable and an Observer. It's an object that holds the Observable execution.

![Subscription schema](./subscription.png)

By default Observables are lazy, which means they don't produce any value before the system `.subscribe()` to them. Once the system subscribes, the Observable push one or more values to the connected Observer.

As we usually do with event listeners or `setInterval()` function, the Observable execution needs to be stopped to avoid memory leaks. The Subscription has one important method `.unsubscribe()` that disposes the resource.

We usually think that memory leaks are hidden and imperceptible. By the way it's completely wrong, in this situation the application becomes quickly unusable before it crashes.

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
    <ul *ngIf="books.length">
      <li *ngFor="let book of books; trackBy: trackById">
        {{ book.title }}
      </li>
    </ul>
  `,
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // highlight-start
    this.bookService.availableBooks$.subscribe(list => { // <- memory leak
      // highlight-end
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
    <ul *ngIf="books.length">
      <li *ngFor="let book of books; trackBy: trackById">
        {{ book.title }}
      </li>
    </ul>
  `,
})
// highlight-start
export class BookListComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  // highlight-end

  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // highlight-start
    this._subscription = this.bookService.availableBooks$.subscribe(books => {
      // highlight-end
      this.books = books;
    });
  }

  // highlight-start
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  // highlight-end

  trackById(index: number, book: Book): string {
    return book.id;
  }
}
```

The Subscription is manually managed and requires some extra work from the developer. This implementation looses the reactivity in favor of imperative programming with side-effects which is exactly what we want to avoid.

#### 👎🏼 Subject + takeUntil

An other approach is to use a `Subject` to notify whenever the component is destroyed in combination with `takeUntil` operator to cleanup the Observable execution.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul *ngIf="books.length">
      <li *ngFor="let book of books; trackBy: trackById">
        {{ book.title }}
      </li>
    </ul>
  `,
})
export class BookListComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>(); // highlight-line

  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.availableBooks$
      .pipe(
        tap(books => {
          this.books = books;
        }),
        takeUntil(this._destroy$) // highlight-line
      )
      .subscribe();
  }

  // highlight-start
  ngOnDestroy(): void {
    this._destroy$.next();
  }
  // highlight-end

  trackById(index: number, book: Book): string {
    return book.id;
  }
}
```

This implementation still looks bad because some extra logic needs to be added to cleanup the Observable execution.

> Note that we don't need to call `this._destroy$.complete()` when component is destroyed because a Subject with no subscriber is just a function.

#### 👍🏼 Async pipe

Angular natively comes with the powerful `async` pipe to manage view Subscriptions effortlessly.

- No extraneous component property.
- Automated subscription management.

```ts
@Component({
  selector: 'book-list',
  template: `
    // highlight-start
    <ul *ngIf="books$ | async as books">
      <li *ngFor="let book of books; trackBy: trackById">
        // highlight-end
        {{ book.title }}
      </li>
    </ul>
  `,
})
export class BookListComponent {
  // highlight-start
  books$: Observable<Book[]> = this.bookService.availableBooks$;
  // highlight-end

  constructor(private bookService: BookService) {}

  trackById(index: number, book: Book): string {
    return book.id;
  }
}
```

This approach removes a lot of code and looks significantly better. I want to emphases that it's important to minimize view subscriptions using the `as` keyword.

Sometimes we need more than one Subscription in the view context. In this case instead doing this.

```html
<ng-container *ngIf="book$ | async as book">
  <div *ngIf="category$ | async as category">
    {{ book.title }} {{ category.name }}
  </div>
</ng-container>
```

Consider the following for readability.

```html
<div *ngIf="{ book: book$ | async, category: category$ | async } as vm;">
  {{ vm.book.title }} {{ vm.category.name }}
</div>
```

#### 👍🏼 Operator + Decorator (voodoo magic)

An other way to manage Subscriptions is to use a dedicated operator or decorator or both. There are a bunch of libraries offering these kind of utils such as:

- [Mindspace-io rxjs-utils](https://github.com/ThomasBurleson/mindspace-utils/blob/master/lib/utils/src/lib/rxjs/README.md)
- [Wishtack Rx-Scavenger](https://github.com/wishtack/wishtack-steroids/tree/master/packages/rx-scavenger)
- [Ngneat until-destroy](https://github.com/ngneat/until-destroy)

In this example I used the `@ngneat/until-destroy` library. I also introduced the `OnPush` change detection strategy to show you a more advanced code example with performance in mind.

```ts
@UntilDestroy() // highlight-line
@Component({
  selector: 'book-list',
  template: `
    <ul *ngIf="books.length">
      <li *ngFor="let book of books; trackBy: trackById">
        {{ book.title }}
      </li>
    </ul>
  `,
  // highlight-start
  changeDetection: ChangeDetectionStrategy.OnPush,
  // highlight-end
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef // highlight-line
  ) {}

  ngOnInit(): void {
    this.books
      .pipe(
        // highlight-start
        tap(books => (this.books = books)),
        tap(() => this.cdr.markForCheck()),
        untilDestroyed(this)
        // highlight-end
      )
      .subscribe();
  }

  // highlight-start
  ngOnDestroy(): void {
    // mandatory
  }
  // highlight-end

  trackById(index: number, book: Book): string {
    return book.id;
  }
}
```

Note that when using a custom operator the `ngOnDestroy` lifecycle hook needs to be implemented otherwise it will instantly throw an error.

## Some rules to follow

- Avoid logic in `.subscribe()`.
- Avoid subscription in services.
- Avoid nested subscribes.
- Use `books$ | async as books` to minimize view subscriptions.
- Delegate subscriptions management as much as you can.

`oembed: https://twitter.com/Michael_Hladky/status/1180316203937681410`

I would close this post with this smart quote from Michael Hladky. I strongly suggest you to follow this guy if you're interested in the Reactive X world, he's consistently publishing interesting stuff.
