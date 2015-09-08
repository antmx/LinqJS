/// <reference path="~/Scripts/Utilities/Namespace.js" />
/// <reference path="~/Scripts/Utilities/Extend.js" />
/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />

Namespace.Define("Netricity.LinqJS");

Netricity.LinqJS.Helper = new Netricity.LinqJS.LinqHelper();
Netricity.LinqJS.LinqifyHelper = new Netricity.LinqJS._LinqifyHelper();

Array.prototype.Linqify = function () {

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
	Netricity.Utilities.extend(list, { Where: Netricity.LinqJS.LinqifyHelper.where });
	Netricity.Utilities.extend(list, { Any: Netricity.LinqJS.LinqifyHelper.any });
	Netricity.Utilities.extend(list, { First: Netricity.LinqJS.LinqifyHelper.first });
	Netricity.Utilities.extend(list, { Last: Netricity.LinqJS.LinqifyHelper.last });
	Netricity.Utilities.extend(list, { All: Netricity.LinqJS.LinqifyHelper.all });
	Netricity.Utilities.extend(list, { ForEach: Netricity.LinqJS.LinqifyHelper.forEach });
	Netricity.Utilities.extend(list, { GetEnumerator: Netricity.LinqJS.LinqifyHelper.getEnumerator });
	Netricity.Utilities.extend(list, { Aggregate: Netricity.LinqJS.LinqifyHelper.aggregate });
	Netricity.Utilities.extend(list, { AggregateWithSeed: Netricity.LinqJS.LinqifyHelper.aggregateWithSeed });
	Netricity.Utilities.extend(list, { AggregateWithSeedAndResultSelector: Netricity.LinqJS.LinqifyHelper.aggregateWithSeedAndResultSelector });
	Netricity.Utilities.extend(list, { Average: Netricity.LinqJS.LinqifyHelper.average });
	Netricity.Utilities.extend(list, { AverageWithTransform: Netricity.LinqJS.LinqifyHelper.averageWithTransform });

	// todo
	// Where DONE
	// Any DONE
	// First DONE
	// Last DONE
	// All DONE
	// Aggregate DONE
	// Average DONE
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
