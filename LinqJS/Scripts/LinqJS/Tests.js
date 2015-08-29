
/// <reference path="~/Scripts/LinqJS/LinqJS.js" />

var a = [1, 2];

// Where
console.log(a.Linqify().Where(function (i) {
	return i % 2 == 0;
}));

// Any
console.log(a.Linqify().Any());
console.log(a.Linqify().Any(function (i) { return i % 3 == 0; }));
