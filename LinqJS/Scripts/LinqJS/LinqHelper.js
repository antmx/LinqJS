/// <reference path="~/Scripts/Utilities/Namespace.js" />
/// <reference path="~/Scripts/Utilities/Enumerator.js" />

Namespace.Define("Netricity.LinqJS");

Netricity.LinqJS.LinqHelper = function () {

}

Netricity.LinqJS.LinqHelper.prototype.helloWorld = function () {
	return "Hello, World!";
}

Netricity.LinqJS.LinqHelper.prototype.getEnumerator = function (items) {
	if (items.enumerator == null)
		items.enumerator = new Netricity.Utilities.Enumerator(items);
	else {
		items.enumerator.reset();
	}

	return items.enumerator;
}

/// Checks the specified object is a function
Netricity.LinqJS.LinqHelper.prototype.ensureLambda = function (lambda) {
	if (typeof (lambda) !== "function")
		throw new Error("lambda must be a function");
};

/// Checks the specified object is an array containing at least 1 item
Netricity.LinqJS.LinqHelper.prototype.ensureItems = function (list) {
	if (list.length == 0)
		throw new Error("Array must contain at least one item");
};

/// where
Netricity.LinqJS.LinqHelper.prototype.where = function (items, lambda) {
	this.ensureLambda(lambda);
	var enumerator = this.getEnumerator(items);
	var results = Netricity.LinqJS.Linqify([]);

	while (enumerator.MoveNext()) {
		if (lambda(enumerator.Current))
			results.push(enumerator.Current);
	}

	return results;
}

/// any
Netricity.LinqJS.LinqHelper.prototype.any = function (items, lambda) {
	if (typeof (lambda) === "undefined")
		return items.length > 0;

	this.ensureLambda(lambda);

	for (var idx = 0; idx < items.length; idx++) {
		var obj = items[idx];

		if (lambda(obj))
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

	for (var idx = 0; idx < items.length; idx++) {
		var obj = items[idx];

		if (lambda(obj))
			return obj;
	}

	throw new Error("Array contains no matching items");
};

/// last
Netricity.LinqJS.LinqHelper.prototype.last = function (items, lambda) {
	if (typeof (lambda) === "undefined") {

		this.ensureItems(items);

		return items[items.length - 1];
	}

	this.ensureLambda(lambda);

	for (var idx = items.length - 1; idx >= 0; idx--) {
		var obj = items[idx];

		if (lambda(obj))
			return obj;
	}

	throw new Error("Array contains no matching items");
};

/// all
Netricity.LinqJS.LinqHelper.prototype.all = function (items, lambda) {
	this.ensureLambda(lambda);

	for (var idx = 0; idx < items.length; idx++) {
		var obj = items[idx];

		if (!lambda(obj))
			return false;
	}

	return true;
};

/// forEach
Netricity.LinqJS.LinqHelper.prototype.forEach = function (items, lambda) {
	this.ensureLambda(lambda);

	for (var idx = 0; idx < items.length; idx++) {
		var obj = items[idx];

		lambda(obj);
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
	var results = Netricity.LinqJS.Linqify([]);
	var enumerator = this.getEnumerator(items);

	while (enumerator.MoveNext()) {
		var obj = lambda(enumerator.Current);
		results.push(obj);
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
}

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
}

/// count
Netricity.LinqJS.LinqHelper.prototype.count = function (items) {

	return items.length;
}

/// defaultIfEmpty
Netricity.LinqJS.LinqHelper.prototype.defaultIfEmpty = function (items, defaultValue) {
	
	if (items != null && items.length > 0)
		return items;

	return [defaultValue];
}

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
}

/// elementAt
Netricity.LinqJS.LinqHelper.prototype.elementAt = function (items, index) {

	if (items.length > index)
		return items[index];

	return null;
}

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
}

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
}

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
}
