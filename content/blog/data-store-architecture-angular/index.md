---
title: Data store architecture - Angular
date: "2019-10-19T12:13:45.573Z"
---

Managing state is challenging when building modern web applications.

In this post I will show you a simple way to create your own state logic using the power of RxJS and Angular services.

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

We are internally using a `BehaviorSubject` to store the current state.

> The BehaviorSubject holds the value that needs to be shared with other components. By exposing a regular Observable these components subscribe to data without the ability to change the value.

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

Our `BookStore` needs to interact with a **communication layer**, our `BookService` that encapsulate HTTP logic.

Back to our `BookStore`, we can update the state using the `next` method from the `BehaviorSubject`.

```ts
@Injectable({ providedIn: "root" })
export class BookStore {
  private readonly _books = new BehaviorSubject<Book[]>([])
  
  public readonly books$ = this._books.asObservable()

  constructor(private bookService: BookService) {}

  getBooks(): void {
    return this.bookService
      .getBooks()
      .pipe(tap(books => this._books.next(books))) /* 👈🏼 Update the state */
  }
}
```

Every time the `next` function is called, all `Observer` received the emitted state, which means that the view is updated reactively.

```ts
@Component({
  selector: "app-root",
  template: `
    <article *ngFor="let book of books$ | async; trackBy: trackById">
      {{ book.title }} - <strong>{{ book.author }}</strong>
    </article>
  `,
})
export class AppComponent implements OnInit {
  readonly books$: Observable<Book[]> = this.bookStore.books$

  constructor(private bookStore: BookStore) {}

  ngOnInit() {
    this.bookStore.getBooks().subscribe()
  }

  trackById(index: number, book: Book) {
    return book.id
  }
}
```
