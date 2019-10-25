---
title: Data store service - Angular
date: "2019-10-19T12:13:45.573Z"
---

Managing state is challenging when building modern web applications.

In this post I will show you a **simple way** to create your own state logic using the power of RxJS and Angular services.

## How to cook the rabbit

A data store is a **service** that manage a single entity type. It's responsible of storing, manipulating, and exposing the entity to the rest of the application.

```ts
@Injectable({ providedIn: "root" })
export class BookStore {
  /* Internal books state initialized with an empty Array */
  private readonly _books = new BehaviorSubject<Book[]>([])

  /* Books are exposed as an Observable to avoid doing anything from outside */
  public readonly books$ = this._books.asObservable()
}
```

We are using a `BehaviorSubject` to store the current state and an `Observable` to expose it.

> The BehaviorSubject holds the value that needs to be shared with other components. These components subscribe to the Observable without the ability to change the value.

Now imagine we want to fetch some books from a remote web service.

```ts
@Injectable({ providedIn: "root" })
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get("https://books.com/api/books")
  }
}
```

The `BookStore` needs to interact with a **communication layer**, the `BookService` that encapsulate HTTP logic.

Back to the `BookStore`, we can update the state using the `next` method from the internal `_books` collection.

```ts
@Injectable({ providedIn: "root" })
export class BookStore {
  private readonly _books = new BehaviorSubject<Book[]>([])
  public readonly books$ = this._books.asObservable()

  constructor(private bookService: BookService) {}

  /* Fetch books and update the state accordingly */
  getBooks(): Observable<Book[]> {
    return this.bookService
      .getBooks()
      .pipe(tap(books => this._books.next(books))) /* 👈🏼 Update the state */
  }
}
```

Now the component can load books at initialization.

```ts
@Component({
  selector: "app-root",
  template: `
    <ng-container *ngIf="books$ | async as books">
      <app-book *ngFor="let book of books; trackBy: trackById"></app-book>
    </ng-container>
  `,
})
export class AppComponent implements OnInit {
  readonly books$: Observable<Book[]> = this.bookStore.books$

  constructor(private bookStore: BookStore) {}

  ngOnInit() {
    this.bookStore
      .getBooks()
      .subscribe({ error: () => /* @todo should probably handle error */ })
  }

  trackById(index: number, book: Book) {
    return book.id
  }
}
```

Every time the `books$` Observable emits a new state, all observers are updated in reaction, which means that the view will always be synchronized with the state.

```ts
@Component({
  selector: "app-book",
  template: `
    <article>
      {{ book.title | capitalize }}
      <strong>{{ book.author | capitalize }}</strong>
    </article>
  `,
})
export class AppBook implements OnInit {
  @Input() book: Book

  constructor(private bookStore: BookStore) {}

  ngOnInit() {}
}
```

### Pros

- Simplicity, we can quickly understand this architecture.
- Reactivity, we get all the benefices from RxJS to create reactive UIs.
- Velocity, with this fashion developers are able to rapidly build features without all the boilerplate needed for an immutable store.

### Cons

- Scalability, as the application grow, the number of service increase and it can rapidly become a big spaghetti dish.
- Testability, testing the store is not trivial because it does a lot of different things.
- Strictness, this pattern doesn't come with strict rules to ensure a kind of global coherence.
