---
title: Managing subscriptions in Angular
date: '2019-12-18T00:00:00.000Z'
---

Observables are everywhere in Angular, a lot of stuff operates using them. In fact **they are used to know when and what to do**.

Let's have a look to the Subscription.

A Subscription represents the connection between an Observable and an Observer. **It's an object that holds the Observable execution**.

![Subscription schema](./subscription.png)

By default Observables are lazy, which means **they don't produce any value before the system subscribe to them**. Once the system subscribes, the Observable start emitting values over time to the connected Observer.

As we usually do with standard functions like `removeEventListener()` or `clearInterval()` we also need to cleanup the Observable execution to avoid memory leaks.

![Demo unsubscribe](./demo.png)

The Subscription has one important method `.unsubscribe()` that stop the Observable execution and dispose the resource.

We usually think that memory leaks are hidden or imperceptible. Obviously it's wrong. At the end it heavily degrades user's experience, causing weird behaviors, or crashing the whole application.

![Beer leak](./beer.gif)

Managing subscriptions is mandatory when dealing with Angular.

## Concretely in Angular

In Angular Subscriptions live close to the component lifecycle. In the following example the `BookService` exposes a long-lived Observable `availableBooks$` that we will use to illustrate the subject.

#### 👎🏼 Common pitfall

Let's start by the memory leak example, here the Observable is subscribed but we intentionally forgot cleaning the Subscription.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul *ngIf="books.length">
      <li *ngFor="let book of books">
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
}
```

When `BookListComponent` get destroyed the `availableBooks$` Observable keeps running in the background. Each time component is recreated the leak becomes bigger.

#### 👍🏼 Referenced Subscription

To avoid memory leaks the most common approach is to use a referenced Subscription to be able to call the `.unsubscribe()` method when the component get destroyed.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul *ngIf="books.length">
      <li *ngFor="let book of books">
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
}
```

This requires extra work to clear the Observable execution. Moreover this approach is imperative, and we can do better.

#### 👍🏼👍🏼 private subject + takeUntil

An other common approach is to use a `Subject` in combination with the `takeUntil` operator to notify whenever the component get destroyed to cleanup the Observable execution.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul *ngIf="books.length">
      <li *ngFor="let book of books">
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
}
```

Note that we don't need to call `.complete()` method because a Subject with no subscriber is just a function.

This implementation still needs some extra work but we can handle many Subscriptions using one single operator.

#### 👍🏼👍🏼👍🏼 Async pipe

Angular natively comes with the powerful `async` pipe to effortlessly manage view Subscriptions.

- No extraneous component property.
- Automated subscription management.
- Automated change detection even with `OnPush`.

```ts
@Component({
  selector: 'book-list',
  template: `
    // highlight-start
    <ul *ngIf="books$ | async as books">
      <li *ngFor="let book of books">
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
}
```

This approach removes a lot of code and looks significantly better. Note that it's important to minimize view subscriptions using the `as` keyword.

Sometimes we need more than one Subscription in the view context. In this case instead of doing this imbrication.

```html
<ng-container *ngIf="book$ | async as book">
  <div *ngIf="category$ | async as category">
    {{ book.title }} {{ category.name }}
  </div>
</ng-container>
```

Consider the following for readability.

```html
<div *ngIf="{ book: book$ | async, category: category$ | async } as vm">
  {{ vm.book.title }} {{ vm.category.name }}
</div>
```

Or using the `shareReplay` operator we can multicast the Observable.

```ts
@Component({ /* ... */ })
export class BookListComponent {
  // highlight-start
  books$: Observable<Book[]> = this.bookService.availableBooks$.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  // highlight-end
}
```

An now we can handle many Subscriptions by sharing them.

```html
<div>{{ (books$ | async)?.length }}</div>
<ul *ngIf="books$ | async as books">
  <li *ngFor="let book of books">
    // highlight-end {{ book.title }}
  </li>
</ul>
```

#### 👍🏼👍🏼👍🏼 Third party garbage collector

An other way to manage Subscriptions is to use a dedicated library that do it for us. There are a bunch of libraries offering these kind of utils such as:

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
      <li *ngFor="let book of books">
        {{ book.title }}
      </li>
    </ul>
  `,
  // highlight-start
  changeDetection: ChangeDetectionStrategy.OnPush,
  // highlight-end
})
export class BookListComponent implements OnInit {
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
}
```

Using this approach we don't care about subscriptions anymore, which is good to avoid doing mistakes. The decorator manage Subscriptions for us.

## Some best practices to follow

✖️ Avoid nested `.subscribe()`.

```ts
observableA().subscribe(result => {
  observableB(result).subscribe(success => {
    /* ... */
  });
});
```

✔️ Consider flattening operators instead.

```ts
observableA()
  .pipe(mergeMap(result => observableB(result)))
  .subscribe(success => {
    /* ... */
  });
```

✖️ Avoid `.subscribe()` in constructors.

```ts
@Component({/* ... */})
export class BookListComponent {
  private _subscription: Subscription;
  books: Book[] = [];

  constructor(private bookService: BookService) {
    this._subscription = this.bookService.availableBooks$.subscribe(books => {
      this.books = books;
    });
  }
}
```

✔️ Use lifecycle hooks instead.

```ts
@Component({/* ... */})
export class BookListComponent implements OnInit {
  private _subscription: Subscription;
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this._subscription = this.bookService.availableBooks$.subscribe(books => {
      this.books = books;
    });
  }
}
```

✖️ Avoid logic in `.subscribe()`.

```ts
```

✖️ Avoid subscription in services.

```ts
@Injectable({ providedIn: 'root' })
export class SomeService {
  currentValue: string;
  constructor() {
    this.getSomeObservable().subscribe(value => {
      this.currentValue = value;
    });
  }
}
```

Use `books$ | async as books` to minimize view subscriptions.
Delegate Subscriptions management as much as you can.

`oembed: https://twitter.com/Michael_Hladky/status/1180316203937681410`

I will close this post with this smart quote from Michael Hladky.
