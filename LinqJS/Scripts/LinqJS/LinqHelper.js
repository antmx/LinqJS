/// <reference path="~/Scripts/Utilities/Namespace.js" />

Namespace.Define("Netricity.LinqJS");

Netricity.LinqJS.LinqHelper = function () {

}

/// Supports a simple iteration over an array.
Netricity.LinqJS.Enumerator = function (items) {
	var currentIdx = 0;
	var self = this;
	this.Current = null;

	this.MoveNext = function () {
		if (items.length > currentIdx) {
			self.Current = items[currentIdx];
			currentIdx++;
			return true;
		}

		return false;
	}

	this.reset = function () {
		currentIdx = 0;
		this.Current = null;
	}
};

Netricity.LinqJS.LinqHelper.prototype.getEnumerator = function (items) {
	if (items.enumerator == null)
		items.enumerator = new Netricity.LinqJS.Enumerator(items);
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
Netricity.LinqJS.LinqHelper.prototype.forEach = function (items, lamda) {
	this.ensureLambda(lamda);

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

	if (!e.MoveNext())
		throw new Error("Array must contain at least 1 element");

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
