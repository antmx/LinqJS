﻿
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

// 
function TestGetEnumerator() {
	window.Logger.LogFunction(arguments.callee);

	var items = [1, 2, 3, 4].Linqify();
	var enumerator = items.GetEnumerator();

	while (enumerator.MoveNext()) {
		console.log(enumerator.Current);
	}

	window.Logger.LogArray(items);
}

TestGetEnumerator();


function TestWhere() {
	window.Logger.LogFunction(arguments.callee);

	var items = [1, 2, 3, 4].Linqify();

	var results = items
		 .Where(function (i) { return i % 2 === 0; });

	window.Logger.LogArray(results);
}

TestWhere();


function TestAggregate() {
	window.Logger.LogFunction(arguments.callee);

	var items = [1, 2, 3, 4].Linqify();

	var aggregateResult = items
		 .Aggregate(function (result, current) {
		 	return result + current;
		 });

	console.log(aggregateResult);
}

TestAggregate();


function TestAggregateWithSeed() {
	window.Logger.LogFunction(arguments.callee);

	var items = [1, 2, 3, 4].Linqify();

	var aggregateResult = items
		 .AggregateWithSeed(function (result, current) {
		 	return result + current;
		 }, 10);

	console.log(aggregateResult);
}

TestAggregateWithSeed();


function TestAggregateWithSeedAndResultSelector() {
	window.Logger.LogFunction(arguments.callee);

	var items = [1, 2, 3, 4].Linqify();

	var aggregateResult = items.AggregateWithSeedAndResultSelector(
		 function (result, current) {
		 	return result + current;
		 },
		 10,
		 function (result) {
		 	return result / 2;
		 });

	console.log(aggregateResult);
}

TestAggregateWithSeedAndResultSelector();


function TestAverage() {
	window.Logger.LogFunction(arguments.callee);

	var items = [2, 4, 6, 8].Linqify();
	var avg = items.Average();

	console.log(avg);
}

TestAverage();
