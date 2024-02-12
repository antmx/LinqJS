# linqJs
## Language Integrated Query (LINQ) for JavaScript

Code example
```js
/// <reference path="./linqify.js" />
// linqify.js automatically adds .linqify() and .deLinqify() methods to arrays

let items = [1, 2, 3, 4, 5, 6, 7, 8];

items.linqify(); // Adds LINQ methods to the array instance

let firstOver4times10 = items
    .where((i) => i > 4)
    .select((i) => i * 10)
    .first();

// firstOver4times10 === 50
```

linqJs includes equivalents of the common .NET Linq methods, i.e.
- aggregate
- all
- any
- average
- concat
- contains
- count
- distinct
- elementAt
- except
- first
- firstOrDefault
- forEach
- groupBy
- intersect
- last
- max
- min
- orderBy
- orderByDescending
- reverse
- select
- selectMany
- setValue
- single
- singleOrDefault
- skip
- skipWhile
- sum
- take
- takeWhile
- union
- where
- zip

