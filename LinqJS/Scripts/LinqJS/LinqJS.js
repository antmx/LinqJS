
/// <reference path="~/Scripts/Utilities/Extend.js" />

Object.prototype.Linqify = function () {

	if (typeof this.length === 'undefined')
		throw new Error('Linqify requires an array');

	if (this._linqified)
		return this;

	this._linqified = true;

	// Add extra methods to the INSTANCE
	Netricity.Utilities.extend(this, { Where: Netricity.LinqJS.Where });
	Netricity.Utilities.extend(this, { Any: Netricity.LinqJS.Any });
	Netricity.Utilities.extend(this, { First: Netricity.LinqJS.First });
	Netricity.Utilities.extend(this, { Last: Netricity.LinqJS.Last });
	Netricity.Utilities.extend(this, { All: Netricity.LinqJS.All });
	Netricity.Utilities.extend(this, { ForEach: Netricity.LinqJS.ForEach });
	Netricity.Utilities.extend(this, { GetEnumerator: Netricity.LinqJS.GetEnumerator });
	Netricity.Utilities.extend(this, { Aggregate: Netricity.LinqJS.Aggregate });
	Netricity.Utilities.extend(this, { AggregateWithSeed: Netricity.LinqJS.AggregateWithSeed });
	Netricity.Utilities.extend(this, { AggregateWithSeedAndResultSelector: Netricity.LinqJS.AggregateWithSeedAndResultSelector });
	Netricity.Utilities.extend(this, { Average: Netricity.LinqJS.Average });

	// todo
	// Where DONE
	// Any DONE
	// First DONE
	// Last DONE
	// All DONE
	// Aggregate DONE
	// Average
	// Concat
	// Contains
	// Count
	// DefaultIfEmpty
	// Distinct
	// ElementAt
	// Except
	// ForEach
	// GroupBy
	// GroupJoin
	// Intersect
	// Join
	// LongCount
	// Max
	// Min
	// OrderBy
	// OrderByDescending
	// Reverse
	// Select (projection)
	// SelectMany (project and flatten)
	// SequenceEqual
	// SetValue (not LINQ but useful)
	// Single
	// Skip
	// SkipWhile
	// Sum
	// Sum(selector)
	// Take
	// TakeWhile
	// ToLookup ?
	// Union
	// Zip


	return this;
};

Namespace.Create("Netricity.LinqJS");

Netricity.LinqJS.EnsureLambda = function (lambda) {
	if (typeof (lambda) !== "function")
		throw new Error("lambda must be a function");
};

Netricity.LinqJS.EnsureItems = function (list) {
	if (list.length == 0)
		throw new Error("Array must contain at least one item");
};

Netricity.LinqJS.Where = function (lambda) {
	Netricity.LinqJS.EnsureLambda(lambda);

	var results = [].Linqify();

	//for (var idx = 0; idx < this.length; idx++) {
	//	var obj = this[idx];

	//	if (lambda(obj))
	//		results.push(obj);
	//}

	var enumerator = this.GetEnumerator();

	while (enumerator.MoveNext()) {
		if (lambda(enumerator.Current))
			results.push(enumerator.Current);
	}

	return results;
};

Netricity.LinqJS.Any = function (lambda) {
	if (typeof (lambda) === "undefined")
		return this.length > 0;

	Netricity.LinqJS.EnsureLambda(lambda);

	for (var idx = 0; idx < this.length; idx++) {
		var obj = this[idx];

		if (lambda(obj))
			return true;
	}

	return false;
};

Netricity.LinqJS.First = function (lambda) {
	if (typeof (lambda) === "undefined") {

		Netricity.LinqJS.EnsureItems(this);

		return this[0];
	}

	Netricity.LinqJS.EnsureLambda(lambda);

	for (var idx = 0; idx < this.length; idx++) {
		var obj = this[idx];

		if (lambda(obj))
			return obj;
	}

	throw new Error("Array contains no matching items");
};

Netricity.LinqJS.Last = function (lambda) {
	if (typeof (lambda) === "undefined") {

		Netricity.LinqJS.EnsureItems(this);

		return this[this.length - 1];
	}

	Netricity.LinqJS.EnsureLambda(lambda);

	for (var idx = this.length - 1; idx >= 0; idx--) {
		var obj = this[idx];

		if (lambda(obj))
			return obj;
	}

	throw new Error("Array contains no matching items");
};

Netricity.LinqJS.All = function (lambda) {
	Netricity.LinqJS.EnsureLambda(lambda);

	for (var idx = 0; idx < this.length; idx++) {
		var obj = this[idx];

		if (!lambda(obj))
			return false;
	}

	return true;
};

Netricity.LinqJS.ForEach = function (lamda) {
	Netricity.LinqJS.EnsureLambda(lamda);

	for (var idx = 0; idx < this.length; idx++) {
		var obj = this[idx];

		lambda(obj);
	}
};

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

	this.Reset = function () {
		currentIdx = 0;
		this.Current = null;
	}
};

/// Returns an enumerator that iterates over the array.
Netricity.LinqJS.GetEnumerator = function () {

	if (this.Enumerator == null)
		this.Enumerator = new Netricity.LinqJS.Enumerator(this);
	else {
		//console.log("enumerator already built");
		this.Enumerator.Reset();
	}

	return this.Enumerator;
};

// Applies an accumulator function over an array.
Netricity.LinqJS.Aggregate = function (lambda) {
	Netricity.LinqJS.EnsureLambda(lambda);

	var e = this.GetEnumerator();

	if (!e.MoveNext())
		throw new Error("Array must contain at least 1 element");

	var result = e.Current;

	while (e.MoveNext())
		result = lambda(result, e.Current);

	return result;
};

Netricity.LinqJS.AggregateWithSeed = function (lambda, seed) {
	Netricity.LinqJS.EnsureLambda(lambda);

	var result = seed;
	var e = this.GetEnumerator();

	while (e.MoveNext())
		result = lambda(result, e.Current);

	return result;
};

Netricity.LinqJS.AggregateWithSeedAndResultSelector = function (lambda, seed, resultSelector) {
	Netricity.LinqJS.EnsureLambda(lambda);
	Netricity.LinqJS.EnsureLambda(resultSelector);

	var result = seed;
	var e = this.GetEnumerator();

	while (e.MoveNext())
		result = lambda(result, e.Current);

	result = resultSelector(result);

	return result;
};

Netricity.LinqJS.Average = function () {

	var enumerator = this.GetEnumerator();
	var total = 0;

	while (enumerator.MoveNext()) {
		total += enumerator.Current;
	}

	var avg = total / this.length;

	return avg;
};

Netricity.LinqJS.AverageWithTransform = function (transformerLambda) {
	Netricity.LinqJS.EnsureLambda(transformerLambda);

	var enumerator = this.GetEnumerator();
	var total = 0;

	while (enumerator.MoveNext()) {
		var value = transformerLambda(e.Current);
		total += value;
	}

	var avg = total / this.length;

	return avg;
};
