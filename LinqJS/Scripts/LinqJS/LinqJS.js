
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

	// todo
	// Where DONE
	// Any DONE
	// First DONE
	// Last DONE
	// All DONE
	// Aggregate 
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

	var results = [];

	for (var idx = 0; idx < this.length; idx++) {
		var obj = this[idx];

		if (lambda(obj))
			results.push(obj);
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

/// Applies an accumulator function over a sequence.
Netricity.LinqJS.Aggregate = function (lambda) {
	Netricity.LinqJS.EnsureLambda(lambda);

	var forLambda = function (lambda) {
		var result;

		for (var idx = 0; idx < this.length; idx++) {

		}
	}
};
