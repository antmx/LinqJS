/// <reference path="../Utilities/Extend.js" />
/// <reference path="../Utilities/Namespace.js" />
/// <reference path="LinqHelper.js" />

Namespace.Define("Netricity.LinqJS");

Netricity.LinqJS.Helper = new Netricity.LinqJS.LinqHelper();
Netricity.LinqJS.LinqifyHelper = new Netricity.LinqJS._LinqifyHelper();

Array.prototype.Linqify = function () {

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
	Netricity.Utilities.extend(list, { FirstOrDefault: Netricity.LinqJS.LinqifyHelper.firstOrDefault });
	Netricity.Utilities.extend(list, { Last: Netricity.LinqJS.LinqifyHelper.last });
	Netricity.Utilities.extend(list, { All: Netricity.LinqJS.LinqifyHelper.all });
	Netricity.Utilities.extend(list, { ForEach: Netricity.LinqJS.LinqifyHelper.forEach });
	Netricity.Utilities.extend(list, { GetEnumerator: Netricity.LinqJS.LinqifyHelper.getEnumerator });
	Netricity.Utilities.extend(list, { Aggregate: Netricity.LinqJS.LinqifyHelper.aggregate });
	Netricity.Utilities.extend(list, { AggregateWithSeed: Netricity.LinqJS.LinqifyHelper.aggregateWithSeed });
	Netricity.Utilities.extend(list, { AggregateWithSeedAndResultSelector: Netricity.LinqJS.LinqifyHelper.aggregateWithSeedAndResultSelector });
	Netricity.Utilities.extend(list, { Average: Netricity.LinqJS.LinqifyHelper.average });
	Netricity.Utilities.extend(list, { AverageWithTransform: Netricity.LinqJS.LinqifyHelper.averageWithTransform });
	Netricity.Utilities.extend(list, { Select: Netricity.LinqJS.LinqifyHelper.select });
	Netricity.Utilities.extend(list, { Concat: Netricity.LinqJS.LinqifyHelper.concat });
	Netricity.Utilities.extend(list, { Contains: Netricity.LinqJS.LinqifyHelper.contains });
	Netricity.Utilities.extend(list, { Count: Netricity.LinqJS.LinqifyHelper.count });
	Netricity.Utilities.extend(list, { DefaultIfEmpty: Netricity.LinqJS.LinqifyHelper.defaultIfEmpty });
	Netricity.Utilities.extend(list, { Distinct: Netricity.LinqJS.LinqifyHelper.distinct });
	Netricity.Utilities.extend(list, { ElementAt: Netricity.LinqJS.LinqifyHelper.elementAt });
	Netricity.Utilities.extend(list, { Except: Netricity.LinqJS.LinqifyHelper.except });
	Netricity.Utilities.extend(list, { Intersect: Netricity.LinqJS.LinqifyHelper.intersect });
	Netricity.Utilities.extend(list, { Max: Netricity.LinqJS.LinqifyHelper.max });
	Netricity.Utilities.extend(list, { Min: Netricity.LinqJS.LinqifyHelper.min });
	Netricity.Utilities.extend(list, { OrderBy: Netricity.LinqJS.LinqifyHelper.orderBy });
	Netricity.Utilities.extend(list, { OrderByDescending: Netricity.LinqJS.LinqifyHelper.orderByDescending });
	Netricity.Utilities.extend(list, { Sum: Netricity.LinqJS.LinqifyHelper.sum });
	Netricity.Utilities.extend(list, { Single: Netricity.LinqJS.LinqifyHelper.single });
	Netricity.Utilities.extend(list, { SingleOrDefault: Netricity.LinqJS.LinqifyHelper.singleOrDefault });
	Netricity.Utilities.extend(list, { Reverse: Netricity.LinqJS.LinqifyHelper.reverse });
	Netricity.Utilities.extend(list, { SelectMany: Netricity.LinqJS.LinqifyHelper.selectMany });
	Netricity.Utilities.extend(list, { Zip: Netricity.LinqJS.LinqifyHelper.zip });
	Netricity.Utilities.extend(list, { Union: Netricity.LinqJS.LinqifyHelper.union });
	Netricity.Utilities.extend(list, { GroupBy: Netricity.LinqJS.LinqifyHelper.groupBy });
	Netricity.Utilities.extend(list, { Take: Netricity.LinqJS.LinqifyHelper.take });

	// todo
	// GroupJoin
	// Join
	// LongCount
	// SequenceEqual
	// SetValue (not LINQ but useful)
	// Skip
	// SkipWhile
	// TakeWhile
	// ToLookup ?

	return list;
}
