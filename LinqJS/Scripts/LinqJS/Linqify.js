/*jslint
    this: true, for: true, white: true
*/

"use strict";

/// <reference path="../Utilities/Extend.js" />
/// <reference path="LinqHelper.js" />

var LinqJS = LinqJS || {};

/** Linqify Makes all arrays Linq-able.
*/
Array.prototype.Linqify = function () {
    
	Linqify(this);

	return this;
};

/**
 * Linqify Adds Linq methods to an array.
 * @param {Array<any>} list The array to add the Linq methods to.
 * @returns {void}
 */
function Linqify(list) {

    if (!list || typeof list.length === 'undefined') {
        throw new Error('Linqify requires an array');
    }

    var helper = new LinqJS.LinqHelper();

    if (list._linqified) {
        return list;
    }

    list._linqified = true;

    // Add extra methods to the INSTANCE
    //debugger;
    Utilities.extend(list, {
        Where: function (lambda) {
            var list = helper.where(this, lambda);
            return Linqify(list);
        }
    });

    Utilities.extend(list, { Any: function (lambda) { return helper.any(this, lambda); } });
    Utilities.extend(list, { First: function (lambda) { return helper.first(this, lambda); } });
    Utilities.extend(list, { FirstOrDefault: helper.firstOrDefault });
    Utilities.extend(list, { Last: function (lambda) { return helper.last(this, lambda); } });
    Utilities.extend(list, { All: function (lambda) { return helper.all(this, lambda); } });
    Utilities.extend(list, { ForEach: helper.forEach });
    //Utilities.extend(list, { GetEnumerator: helper.getEnumerator });
    Utilities.extend(list, { Aggregate: function (lambda) { return helper.aggregate(this, lambda); } });
    Utilities.extend(list, { AggregateWithSeed: function (lambda, seed) { return helper.aggregateWithSeed(this, lambda, seed); } });
    Utilities.extend(list, { AggregateWithSeedAndResultSelector: function (lambda, seed, resultSelector) { return helper.aggregateWithSeedAndResultSelector(this, lambda, seed, resultSelector); } });
    Utilities.extend(list, { Average: function () { return helper.average(this); } });
    Utilities.extend(list, { AverageWithTransform: function (transformerLambda) { return helper.averageWithTransform(this, transformerLambda); } });
    Utilities.extend(list, { Select: function (lambda) { return helper.select(this, lambda); } });
    Utilities.extend(list, { Concat: helper.concat });
    Utilities.extend(list, { Contains: helper.contains });
    Utilities.extend(list, { Count: helper.count });
    Utilities.extend(list, { DefaultIfEmpty: helper.defaultIfEmpty });
    Utilities.extend(list, { Distinct: helper.distinct });
    Utilities.extend(list, { ElementAt: helper.elementAt });
    Utilities.extend(list, { Except: helper.except });
    Utilities.extend(list, { Intersect: helper.intersect });
    Utilities.extend(list, { Max: function (comparerLambda) { return helper.max(this, comparerLambda); } });
    Utilities.extend(list, { Min: function (comparerLambda) { return helper.min(this, comparerLambda); } });
    Utilities.extend(list, { OrderBy: helper.orderBy });
    Utilities.extend(list, { OrderByDescending: helper.orderByDescending });
    Utilities.extend(list, { Sum: function (valueSelectorLambda) { return helper.sum(this, valueSelectorLambda); } });
    Utilities.extend(list, { Single: helper.single });
    Utilities.extend(list, { SingleOrDefault: helper.singleOrDefault });
    Utilities.extend(list, { Reverse: helper.reverse });
    Utilities.extend(list, { SelectMany: helper.selectMany });
    Utilities.extend(list, { Zip: helper.zip });
    Utilities.extend(list, { Union: helper.union });
    Utilities.extend(list, { GroupBy: helper.groupBy });
    Utilities.extend(list, { Take: helper.take });
    Utilities.extend(list, { TakeWhile: helper.takeWhile });
    Utilities.extend(list, { Skip: helper.skip });
    Utilities.extend(list, { SkipWhile: helper.skipWhile });

    // Also include these 'internal' methods
    Utilities.extend(list, { ensureLambda: function (lambda) { return helper.ensureLambda(lambda); } });
    Utilities.extend(list, { ensureItems: function (list, canBeEmpty) { return helper.ensureItems(list, canBeEmpty); } });

    // todo
    // GroupJoin
    // Join
    // LongCount
    // SequenceEqual
    // SetValue (not LINQ but useful)
    // ToLookup ?

    return list;
}
