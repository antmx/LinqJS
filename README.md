# linqJs
## Language Integrated Query for JavaScript

Code example
```js
/// <reference path="./linqify.js" />

let _items = [1, 2, 3, 4, 5, 6, 7, 8];

// linqify.js automatically adds .linqify() and .deLinqify() methods to arrays

_items.linqify();

let firstOver4times10 = _items
    .where(function (i) { return i > 4 })
    .select((i) => i * 10)
    .first();

// firstOver4times10 = 50
```
