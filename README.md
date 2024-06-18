# linqJs
## Language Integrated Query (LINQ) for JavaScript

Code example
```js
/// <reference path="./linqify.js" />
// linqify.js automatically adds .linqify() and .deLinqify() methods to arrays

let items = [5, 6, 7, 8, 1, 2, 3, 4];

items.linqify(); // Adds LINQ methods to the array instance

let firstOver4times10 = items
    .where((i) => i > 4)
    .select((i) => i * 10)
    .orderBy((i) => i)
    .first();

// firstOver4times10 === 50
```

linqJs includes equivalents of the common .NET Linq methods, i.e.
- [aggregate](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.aggregate)
- [all](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.all)
- [any](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.any)
- [average](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.average)
- [concat](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.concat)
- [contains](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.contains)
- [count](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.count)
- [distinct](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinct)
- [elementAt](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.elementAt)
- [except](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.except)
- [first](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.first)
- [firstOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.firstOrDefault)
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

