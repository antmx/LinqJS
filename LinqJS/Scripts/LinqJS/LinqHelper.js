/// <reference path="../Utilities/Enumerator.js" />
/// <reference path="../Utilities/Namespace.js" />
/// <reference path="EnumerableSorter.js" />

"use strict";

Namespace.Define("Netricity.LinqJS");

Netricity.LinqJS.LinqHelper = function () {

};

Netricity.LinqJS.LinqHelper.prototype.helloWorld = function () {
	return "Hello, World!";
};

Netricity.LinqJS.LinqHelper.prototype.getEnumerator = function (items) {
	if (items.enumerator == null) {
		items.enumerator = new Netricity.Utilities.Enumerator(items);
	}
	else {
		items.enumerator.reset();
	}

	return items.enumerator;
};

/// Checks the specified object is a function
Netricity.LinqJS.LinqHelper.prototype.ensureLambda = function (lambda) {
	if (typeof (lambda) !== "function") {
		throw new Error("lambda must be a function");
	}
};

/// Checks the specified object is a function, if it isn't null
Netricity.LinqJS.LinqHelper.prototype.ensureLambdaIfNotNull = function (lambda) {
	if (typeof (lambda) !== "undefined") {
		this.ensureLambda(lambda);
	}
};

/// Checks the specified object is an array containing at least 1 item
Netricity.LinqJS.LinqHelper.prototype.ensureItems = function (list, canBeEmpty) {
	if (list == null) {
		throw new Error("Array must not be null");
	}

	if (!this.isArray(list)) {
		throw new Error("list must be an array");
	}

	if (list.length == 0 && canBeEmpty !== true) {
		throw new Error("Array must contain at least one item");
	}

	return true;
};

/// Determines if the specified object is an array
Netricity.LinqJS.LinqHelper.prototype.isArray = function (obj) {
	if (obj == null) {
		throw new Error("obj must not be null");
	}

	if (Object.prototype.toString.call(obj) !== '[object Array]') {
		return false;
	}

	return true;
};

/// where
Netricity.LinqJS.LinqHelper.prototype.where = function (items, lambda) {
	this.ensureLambda(lambda);
	//var enumerator = this.getEnumerator(items);
	var results = [];

	//while (enumerator.MoveNext()) {
	//	if (lambda(enumerator.Current))
	//		results.push(enumerator.Current);
	//}

	this.forEach(items, function (indexInArray, valueOfElement) {
		if (lambda(valueOfElement)) {
			results.push(valueOfElement);
		}
	});

	return results;
};

/// any
Netricity.LinqJS.LinqHelper.prototype.any = function (items, lambda) {
	if (typeof (lambda) === "undefined") {
		return items.length > 0;
	}

	this.ensureLambda(lambda);

	var item;

	for (var idx = 0; idx < items.length; idx++) {
		item = items[idx];

		if (lambda(item))
			return true;
	}

	return false;
};

/// first
Netricity.LinqJS.LinqHelper.prototype.first = function (items, lambda) {
	if (typeof (lambda) === "undefined") {

		this.ensureItems(items);

		return items[0];
	}

	this.ensureLambda(lambda);

	var item;

	for (var idx = 0; idx < items.length; idx++) {
		item = items[idx];

		if (lambda(item))
			return item;
	}

	throw new Error("Array contains no matching items");
};

/// firstOrDefault
Netricity.LinqJS.LinqHelper.prototype.firstOrDefault = function (items, lambda, defaultValue) {
	this.ensureLambdaIfNotNull(lambda);

	if (typeof (lambda) === "undefined") {

		this.ensureItems(items, true);

		return items.length == 0 ? defaultValue : items[0];
	}

	var item;

	for (var idx = 0; idx < items.length; idx++) {
		item = items[idx];

		if (lambda(item))
			return item;
	}

	return defaultValue;
};

/// last
Netricity.LinqJS.LinqHelper.prototype.last = function (items, lambda) {
	if (typeof (lambda) === "undefined") {

		this.ensureItems(items);

		return items[items.length - 1];
	}

	this.ensureLambda(lambda);

	var item;

	for (var idx = items.length - 1; idx >= 0; idx--) {
		item = items[idx];

		if (lambda(item))
			return item;
	}

	throw new Error("Array contains no matching items");
};

/// all
Netricity.LinqJS.LinqHelper.prototype.all = function (items, lambda) {
	this.ensureLambda(lambda);

	var item;

	for (var idx = 0; idx < items.length; idx++) {
		item = items[idx];

		if (!lambda(item))
			return false;
	}

	return true;
};

/// forEach
Netricity.LinqJS.LinqHelper.prototype.forEach = function (items, lambda) {
	this.ensureLambda(lambda);
	var indexInArray = 0;
	var valueOfElement;

	for (; indexInArray < items.length; indexInArray++) {
		valueOfElement = items[indexInArray];

		lambda(indexInArray, valueOfElement);
	}
};

/// aggregate
Netricity.LinqJS.LinqHelper.prototype.aggregate = function (items, lambda) {
	this.ensureLambda(lambda);
	this.ensureItems(items);

	var e = this.getEnumerator(items);

	var result = e.Current;

	while (e.MoveNext())
		result = lambda(result, e.Current);

	return result;
};

/// aggregateWithSeed
Netricity.LinqJS.LinqHelper.prototype.aggregateWithSeed = function (items, lambda, seed) {
	this.ensureLambda(lambda);
	this.ensureItems(items);

	var result = seed;
	var e = this.getEnumerator(items);

	while (e.MoveNext())
		result = lambda(result, e.Current);

	return result;
};

/// aggregateWithSeedAndResultSelector
Netricity.LinqJS.LinqHelper.prototype.aggregateWithSeedAndResultSelector = function (items, lambda, seed, resultSelector) {
	this.ensureLambda(lambda);
	this.ensureLambda(resultSelector);

	var result = seed;
	var e = this.getEnumerator(items);

	while (e.MoveNext())
		result = lambda(result, e.Current);

	result = resultSelector(result);

	return result;
};

/// average
Netricity.LinqJS.LinqHelper.prototype.average = function (items) {

	var enumerator = this.getEnumerator(items);
	var total = 0;

	while (enumerator.MoveNext()) {
		total += enumerator.Current;
	}

	var avg = total / items.length;

	return avg;
};

/// averageWithTransform
Netricity.LinqJS.LinqHelper.prototype.averageWithTransform = function (items, transformerLambda) {
	this.ensureLambda(transformerLambda);

	var enumerator = this.getEnumerator(items);
	var total = 0;

	while (enumerator.MoveNext()) {
		var value = transformerLambda(enumerator.Current);
		total += value;
	}

	var avg = total / items.length;

	return avg;
};

/// select
Netricity.LinqJS.LinqHelper.prototype.select = function (items, lambda) {

	this.ensureItems(items, true);
	var results = [];
	var enumerator = this.getEnumerator(items);

	var item;

	while (enumerator.MoveNext()) {
		item = lambda(enumerator.Current);
		results.push(item);
	}

	return results;
};

/// concat
Netricity.LinqJS.LinqHelper.prototype.concat = function (firstItems, secondItems) {

	var results = [];

	var e = this.getEnumerator(firstItems);

	while (e.MoveNext()) {
		results.push(e.Current);
	}

	e = this.getEnumerator(secondItems);

	while (e.MoveNext()) {
		results.push(e.Current);
	}

	return results;
};

/// contains
Netricity.LinqJS.LinqHelper.prototype.contains = function (items, value, comparerLambda) {

	var e = this.getEnumerator(items);

	if (typeof (comparerLambda) !== "function") {
		comparerLambda = function (first, second) {
			return first == second;
		}
	};

	while (e.MoveNext()) {
		if (comparerLambda(e.Current, value))
			return true;
	}

	return false;
};

/// count
Netricity.LinqJS.LinqHelper.prototype.count = function (items) {

	this.ensureItems(items, true);

	return items.length;
};

/// defaultIfEmpty
Netricity.LinqJS.LinqHelper.prototype.defaultIfEmpty = function (items, defaultValue) {

	if (items != null && items.length > 0)
		return items;

	return [defaultValue];
};

/// distinct
Netricity.LinqJS.LinqHelper.prototype.distinct = function (items, comparerLambda) {

	var results = [];

	var e = this.getEnumerator(items);

	while (e.MoveNext()) {
		if (!this.contains(results, e.Current, comparerLambda))
			results.push(e.Current);
	}

	delete results.enumerator;

	return results;
};

/// elementAt
Netricity.LinqJS.LinqHelper.prototype.elementAt = function (items, index) {

	if (items.length > index)
		return items[index];

	return null;
};

/// except
Netricity.LinqJS.LinqHelper.prototype.except = function (firstItems, secondItems, comparerLambda) {

	var results = [];

	firstItems = this.distinct(firstItems, comparerLambda);
	secondItems = this.distinct(secondItems, comparerLambda);

	var e = this.getEnumerator(firstItems);

	while (e.MoveNext()) {
		if (!this.contains(secondItems, e.Current, comparerLambda))
			results.push(e.Current);
	}

	e = this.getEnumerator(secondItems);

	while (e.MoveNext()) {
		if (!this.contains(firstItems, e.Current, comparerLambda))
			results.push(e.Current);
	}

	return results;
};

/// intersect
Netricity.LinqJS.LinqHelper.prototype.intersect = function (firstItems, secondItems, comparerLambda) {

	var results = [];

	firstItems = this.distinct(firstItems, comparerLambda);

	var e = this.getEnumerator(firstItems);

	while (e.MoveNext()) {
		if (this.contains(secondItems, e.Current, comparerLambda))
			results.push(e.Current);
	}

	return results;
};

/// max
Netricity.LinqJS.LinqHelper.prototype.max = function (items, comparerLambda) {

	if (typeof (comparerLambda) !== "function") {
		comparerLambda = function (first, second) {
			return first > second;
		}
	};

	var result;

	var e = this.getEnumerator(items);

	while (e.MoveNext()) {
		if (typeof (result) === "undefined" || comparerLambda(e.Current, result))
			result = e.Current;
	}

	return result;
};

/// min
Netricity.LinqJS.LinqHelper.prototype.min = function (items, comparerLambda) {

	if (typeof (comparerLambda) !== "function") {
		comparerLambda = function (first, second) {
			return first < second;
		}
	};

	var result;

	var e = this.getEnumerator(items);

	while (e.MoveNext()) {
		if (typeof (result) === "undefined" || comparerLambda(e.Current, result))
			result = e.Current;
	}

	return result;
};

/// orderBy
Netricity.LinqJS.LinqHelper.prototype.orderBy = function (items, keySelectorLambda, comparerLambda) {

	this.ensureItems(items);

	items = items.slice(); // Clone the array so .sort doesn't re-order the original

	this.ensureLambdaIfNotNull(keySelectorLambda);

	this.ensureLambdaIfNotNull(comparerLambda);

	if (typeof (keySelectorLambda) === "undefined")
		keySelectorLambda = function (o) { return o; };

	var comparefn;

	if (typeof (comparerLambda) === "undefined")
		comparefn = function (a, b) { return keySelectorLambda(a) - keySelectorLambda(b); };
	else {
		comparefn = function (a, b) {
			a = keySelectorLambda(a);
			b = keySelectorLambda(b);

			return comparerLambda(a, b);
		}
	}

	items.sort(comparefn);

	return items;
};

/// orderByDescending
Netricity.LinqJS.LinqHelper.prototype.orderByDescending = function (items, keySelectorLambda, comparerLambda) {

	return this.orderBy(items, keySelectorLambda, comparerLambda).reverse();

};

/// sum
Netricity.LinqJS.LinqHelper.prototype.sum = function (items, valueSelectorLambda) {

	this.ensureItems(items, true);

	if (typeof (valueSelectorLambda) === "undefined") {
		valueSelectorLambda = function (o) { return o; };
	}

	var total = 0;

	//var e = this.getEnumerator(items);

	//while (e.MoveNext()) {
	//	total += valueSelectorLambda(e.Current);
	//}

	this.forEach(items, function (indexInArray, valueOfElement) {
		total += valueSelectorLambda(valueOfElement);
	});

	return total;
};

/// single
Netricity.LinqJS.LinqHelper.prototype.single = function (items, lambda) {

	this.ensureItems(items);

	var count = 0;

	if (typeof (lambda) !== "function") {
		lambda = function (item) {
			return true;
		}
	};

	var result;
	var e = this.getEnumerator(items);

	while (e.MoveNext()) {
		if (lambda(e.Current)) {
			result = e.Current;
			count++;
		}
	}

	switch (count) {
		case 0: throw new Error("No match found");
		case 1: return result;
	}

	throw new Error("More than 1 match found");
};

/// singleOrDefault
Netricity.LinqJS.LinqHelper.prototype.singleOrDefault = function (items, lambda, defaultValue) {

	this.ensureItems(items);

	if (typeof (defaultValue) === "undefined")
		throw new Error("defaultValue must be provided");

	var count = 0;

	if (typeof (lambda) !== "function") {
		lambda = function (item) {
			return true;
		}
	};

	var result;
	var e = this.getEnumerator(items);

	while (e.MoveNext()) {
		if (lambda(e.Current)) {
			result = e.Current;
			count++;
		}
	}

	switch (count) {
		case 0: return defaultValue;
		case 1: return result;
	}

	throw new Error("More than 1 match found");
};

/// reverse
Netricity.LinqJS.LinqHelper.prototype.reverse = function (items) {

	if (items == null)
		throw new Error("Array must not be null");

	if (items.length === 0)
		return items;

	items = items.slice(); // Clone the array so .reverse doesn't re-order the original

	return items.reverse();
};

/// selectMany
Netricity.LinqJS.LinqHelper.prototype.selectMany = function (items, collectionSelectorLambda, transformLambda) {

	this.ensureItems(items, true);
	this.ensureLambda(collectionSelectorLambda);
	this.ensureLambdaIfNotNull(transformLambda);

	if (items.length === 0)
		return items;

	var result = [];
	var e = this.getEnumerator(items);

	var subElements;
	var eSub;
	var o;

	while (e.MoveNext()) {
		subElements = collectionSelectorLambda(e.Current);
		eSub = this.getEnumerator(subElements);

		while (eSub.MoveNext()) {
			if (transformLambda) {
				o = transformLambda(eSub.Current, e.CurrentIdx);
				result.push(o);
			} else {
				result.push(eSub.Current);
			}
		}
	}

	return result;
};

/// zip
Netricity.LinqJS.LinqHelper.prototype.zip = function (items1, items2, lambda) {

	this.ensureItems(items1);
	this.ensureItems(items2);
	this.ensureLambda(lambda);

	var result = [];
	var e1 = this.getEnumerator(items1);
	var e2 = this.getEnumerator(items2);
	var item;

	while (e1.MoveNext() && e2.MoveNext()) {
		item = lambda(e1.Current, e2.Current);
		result.push(item);
	}

	return result;
};

/// union
Netricity.LinqJS.LinqHelper.prototype.union = function (firstItems, secondItems, comparerLambda) {

	var results = [];

	firstItems = this.distinct(firstItems, comparerLambda);
	secondItems = this.distinct(secondItems, comparerLambda);

	var e = this.getEnumerator(firstItems);

	while (e.MoveNext()) {
		if (!this.contains(results, e.Current, comparerLambda))
			results.push(e.Current);
	}

	e = this.getEnumerator(secondItems);

	while (e.MoveNext()) {
		if (!this.contains(results, e.Current, comparerLambda))
			results.push(e.Current);
	}

	delete results.enumerator;

	return results;
};

/// groupBy
Netricity.LinqJS.LinqHelper.prototype.groupBy = function (items, keySelectorLambda) {

	this.ensureLambda(keySelectorLambda);
	var results = [];

	if (items == null || items.length == 0)
		return results;

	var e = this.getEnumerator(items);
	var currentKey;
	var item;

	while (e.MoveNext()) {
		currentKey = keySelectorLambda(e.Current);

		item = this.firstOrDefault(
			results,
			function (o) { return o.Key == currentKey },
			{ Key: currentKey, Count: 0 });

		if (item.Count == 0) {
			results.push(item);
		}

		item.Count++;
	}

	return results;
};

/// take
Netricity.LinqJS.LinqHelper.prototype.take = function (items, count) {

	this.ensureItems(items, true);

	var results = [];

	if (count <= 0)
		return results;

	var e = this.getEnumerator(items);

	while (e.MoveNext() && e.CurrentIdx < count) {
		results.push(e.Current);
	}

	return results;
};

/// takeWhile
Netricity.LinqJS.LinqHelper.prototype.takeWhile = function (items, predicate) {

	this.ensureItems(items, true);

	var results = [];

	var e = this.getEnumerator(items);

	while (e.MoveNext()) {
		if (predicate(e.Current, e.CurrentIdx)) {
			results.push(e.Current);
		} else {
			break;
		}
	}

	return results;
};

/// skip
Netricity.LinqJS.LinqHelper.prototype.skip = function (items, count) {

	this.ensureItems(items, true);

	var results = [];

	if (count <= 0)
		return results;

	var e = this.getEnumerator(items);

	while (count > 0 && e.MoveNext())
		count--;

	if (count <= 0) {
		while (e.MoveNext())
			results.push(e.Current);
	}

	return results;
};

/// skipWhile
Netricity.LinqJS.LinqHelper.prototype.skipWhile = function (items, predicate) {

	this.ensureItems(items, true);

	var results = [];

	var e = this.getEnumerator(items);

	var yielding = false;

	while (e.MoveNext()) {
		if (!yielding && !predicate(e.Current, e.CurrentIdx))
			yielding = true;

		if (yielding)
			results.push(e.Current);
	}

	return results;
};

/// setValue
Netricity.LinqJS.LinqHelper.prototype.setValue = function (arr, value, indices) {

	this.ensureItems(arr, true);

	if (typeof (indices) === "number") {
		indices = [indices];
	}

	this.ensureItems(indices, false);

	var e = this.getEnumerator(indices);

	var currentDimensionArray = arr;

	debugger;

	var currentIndicee = -1;

	for (var i = 0; i < indices.length; i++) {

		currentIndicee = indices[i];

		if (i < indices.length - 1)
			currentDimensionArray = currentDimensionArray[indices[i]];
	}

	currentDimensionArray[currentIndicee] = value;
};

/* todo - use 'each' instead of Enumerator

	each: function( obj, callback ) {
		var length, i = 0;

			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}

		return obj;
	}

*/

/// each
Netricity.LinqJS.LinqHelper.prototype.each = function (items, lambda) {

	// lambda should be function(indexInArray, valueOfElement) { .... }
	this.ensureLambda(lambda);

	var value;
	var i = 0;
	var length = items.length;
	var isArr = this.isArray(items);

	if (isArr) {
		for (; i < length; i++) {
			value = lambda.call(items[i], i, items[i]);

			if (value === false) {
				break;
			}
		}
	} else {
		for (i in items) {
			value = lambda.call(items[i], i, items[i]);

			if (value === false) {
				break;
			}
		}
	}

	return items;
};
