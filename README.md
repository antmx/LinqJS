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

linqJs includes equivalents of the common .NET Linq, Generic and Array methods, i.e.
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
- [forEach](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.foreach)
- [groupBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupBy)
- [intersect](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.intersect)
- [last](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.last)
- [max](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.max)
- [min](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.min)
- [orderBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderBy)
- [orderByDescending](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderByDescending)
- [reverse](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.reverse)
- [select](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.select)
- [selectMany](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.selectMany)
- [setValue](https://learn.microsoft.com/en-us/dotnet/api/system.array.setvalue)
- [single](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.single)
- [singleOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.singleOrDefault)
- [skip](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skip)
- [skipWhile](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skipWhile)
- [sum](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.sum)
- [take](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.take)
- [takeWhile](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.takeWhile)
- [union](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.union)
- [where](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.where)
- [zip](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.zip)

