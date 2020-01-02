---
title: RxJS best practices
date: '2020-01-01T00:00:00.000Z'
---

I listed some best practices (or code smell) that I have seen a couple of times.

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
@Component({ /* ... */ })
export class BookListComponent {
  constructor(private bookService: BookService) {
    this._subscription = this.bookService.availableBooks$.subscribe(books => {
      this.books = books;
    });
  }
}
```

✔️ Use lifecycle hooks instead.

```ts
@Component({ /* ... */ })
export class BookListComponent implements OnInit {
  ngOnInit(): void {
    this._subscription = this.bookService.availableBooks$.subscribe(books => {
      this.books = books;
    });
  }
}
```

✖️ Avoid logic in `.subscribe()`.

```ts
@Component({ /* ... */ })
export class BookListComponent implements OnInit {
  ngOnInit(): void {
    this._subscription = this.bookService.availableBooks$.subscribe(books => {
      this.books = mapToItems(books);
      this.popularBooksCount = getPopularBooksLength(books);
    });
  }
}
```

✖️ Avoid `.subscribe()` in services.

```ts
@Injectable({ /* ... */ })
export class SomeService {
  currentValue: string;

  constructor() {
    this.getSomeObservable().subscribe(value => {
      this.currentValue = value;
    });
  }
}
```

✔️ Embrace multicasting for expensive computations.

```ts
@Component({ /* ... */ })
export class BookListComponent {
  books$: Observable<Book[]> = this.bookService.availableBooks$.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
```
