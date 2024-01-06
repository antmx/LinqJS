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
