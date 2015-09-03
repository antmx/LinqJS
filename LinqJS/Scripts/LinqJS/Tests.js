
/// <reference path="~/Scripts/LinqJS/LinqJS.js" />

var a = [1, 2, 3, 4];

// Where
console.log(a.Linqify().Where(function (i) { return i % 2 == 0; }));

// Any
console.log(a.Linqify().Any());
console.log(a.Linqify().Any(function (i) { return i % 3 == 0; }));

// First
console.log(a.Linqify().First());
console.log(a.Linqify().First(function (i) { return i % 2 == 0; }));

// Last
console.log(a.Linqify().Last());
console.log(a.Linqify().Last(function (i) { return i % 2 == 0; }));

// All
console.log(a.Linqify().All(function (i) { return i % 2 == 0; }));
console.log(a.Linqify().All(function (i) { return i < 100; }));
