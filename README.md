# linqJs
## Language Integrated Query for JavaScript

Code example
```js
let _items = [1, 2, 3, 4, 5, 6, 7, 8];

_items.linqify();

let firstOver4times10 = _items
    .where(function (i) { return i > 4 })
    .select((i) => i * 10)
    .first();
```
