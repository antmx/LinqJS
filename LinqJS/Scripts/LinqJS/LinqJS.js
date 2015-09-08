/// <reference path="~/Scripts/Utilities/Namespace.js" />
/// <reference path="~/Scripts/Utilities/Extend.js" />
/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />

Namespace.Define("Netricity.LinqJS");
Netricity.LinqJS.Helper = new Netricity.LinqJS.LinqHelper();

Array.prototype.Linqify = function () {

	//if (typeof this.length === 'undefined')
	//	throw new Error('Linqify requires an array');

	//if (this._linqified)
	//	return this;

	//this._linqified = true;

	//// Add extra methods to the INSTANCE
	//Netricity.Utilities.extend(this, { Where: Netricity.LinqJS.Where });
	//Netricity.Utilities.extend(this, { Any: Netricity.LinqJS.Any });
	//Netricity.Utilities.extend(this, { First: Netricity.LinqJS.First });
	//Netricity.Utilities.extend(this, { Last: Netricity.LinqJS.Last });
	//Netricity.Utilities.extend(this, { All: Netricity.LinqJS.All });
	//Netricity.Utilities.extend(this, { ForEach: Netricity.LinqJS.ForEach });
	//Netricity.Utilities.extend(this, { GetEnumerator: Netricity.LinqJS.GetEnumerator });
	//Netricity.Utilities.extend(this, { Aggregate: Netricity.LinqJS.Aggregate });
	//Netricity.Utilities.extend(this, { AggregateWithSeed: Netricity.LinqJS.AggregateWithSeed });
	//Netricity.Utilities.extend(this, { AggregateWithSeedAndResultSelector: Netricity.LinqJS.AggregateWithSeedAndResultSelector });
	//Netricity.Utilities.extend(this, { Average: Netricity.LinqJS.Average });

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

	Netricity.LinqJS.Linqify(this);

	return this;
};

Netricity.LinqJS.Linqify = function (list) {
	if (!list || typeof list.length === 'undefined')
		throw new Error('Linqify requires an array');

	if (list._linqified)
		return list;

	list._linqified = true;

	// Add extra methods to the INSTANCE
	Netricity.Utilities.extend(list, { Where: Netricity.LinqJS.Where });
	Netricity.Utilities.extend(list, { Any: Netricity.LinqJS.Any });
	Netricity.Utilities.extend(list, { First: Netricity.LinqJS.First });
	Netricity.Utilities.extend(list, { Last: Netricity.LinqJS.Last });
	Netricity.Utilities.extend(list, { All: Netricity.LinqJS.All });
	Netricity.Utilities.extend(list, { ForEach: Netricity.LinqJS.ForEach });
	Netricity.Utilities.extend(list, { GetEnumerator: Netricity.LinqJS.GetEnumerator });
	Netricity.Utilities.extend(list, { Aggregate: Netricity.LinqJS.Aggregate });
	Netricity.Utilities.extend(list, { AggregateWithSeed: Netricity.LinqJS.AggregateWithSeed });
	Netricity.Utilities.extend(list, { AggregateWithSeedAndResultSelector: Netricity.LinqJS.AggregateWithSeedAndResultSelector });
	Netricity.Utilities.extend(list, { Average: Netricity.LinqJS.Average });
	Netricity.Utilities.extend(list, { AverageWithTransform: Netricity.LinqJS.AverageWithTransform });

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
	
	return list;
}

Netricity.LinqJS.Where = function (lambda) {
	return Netricity.LinqJS.Helper.where(this, lambda);
};

Netricity.LinqJS.Any = function (lambda) {
	return Netricity.LinqJS.Helper.any(this, lambda);
};

Netricity.LinqJS.First = function (lambda) {
	return Netricity.LinqJS.Helper.first(this, lambda);
};

Netricity.LinqJS.Last = function (lambda) {
	return Netricity.LinqJS.Helper.last(this, lambda);
};

Netricity.LinqJS.All = function (lambda) {
	return Netricity.LinqJS.Helper.all(this, lambda);
};

Netricity.LinqJS.ForEach = function (lamda) {
	return Netricity.LinqJS.Helper.forEach(this, lambda);
};

/// Returns an enumerator that iterates over the array.
Netricity.LinqJS.GetEnumerator = function () {
	return Netricity.LinqJS.Helper.getEnumerator(this);
};

// Applies an accumulator function over an array.
Netricity.LinqJS.Aggregate = function (lambda) {
	return Netricity.LinqJS.Helper.aggregate(this, lambda);
};

Netricity.LinqJS.AggregateWithSeed = function (lambda, seed) {
	return Netricity.LinqJS.Helper.aggregateWithSeed(this, lambda, seed);
};

Netricity.LinqJS.AggregateWithSeedAndResultSelector = function (lambda, seed, resultSelector) {
	return Netricity.LinqJS.Helper.aggregateWithSeedAndResultSelector(this, lambda, seed, resultSelector);
};

Netricity.LinqJS.Average = function () {
	return Netricity.LinqJS.Helper.average(this);
};

Netricity.LinqJS.AverageWithTransform = function (transformerLambda) {
	return Netricity.LinqJS.Helper.averageWithTransform(this, transformerLambda);
};
