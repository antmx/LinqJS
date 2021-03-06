﻿/*jslint
    this: true, for: true, white: true
*/

"use strict";

/// <reference path="../Utilities/Extend.js" />
/// <reference path="LinqCore.js" />

var LinqJS = LinqJS || {};

/**
 * Makes all arrays Linq-able.
 * @returns {LinqableArray} Returns an Linq-able array.
 */
Array.prototype.Linqify = function () {
    
	Linqify(this);

	return this;
};

/** Stops an array being Linq-able.
 * @returns {[]} Returns an non-Linq-able.
 */
Array.prototype.DeLinqify = function () {

    DeLinqify(this);

    return this;
};

function DeLinqify(list) {

    delete list._linqified;
    delete list.Where;
    delete list.Any;
    delete list.First;
    delete list.FirstOrDefault;
    delete list.Last;
    delete list.All;
    delete list.ForEach;
    delete list.Aggregate;
    delete list.AggregateWithSeed;
    delete list.AggregateWithSeedAndResultSelector;
    delete list.Average;
    delete list.AverageWithTransform;
    delete list.Select;
    delete list.Concat;
    delete list.Contains;
    delete list.Count;
    delete list.DefaultIfEmpty;
    delete list.Distinct;
    delete list.ElementAt;
    delete list.Except;
    delete list.Intersect;
    delete list.Max;
    delete list.Min;
    delete list.OrderBy;
    delete list.OrderByDescending;
    delete list.Sum;
    delete list.Single;
    delete list.SingleOrDefault;
    delete list.Reverse;
    delete list.SelectMany;
    delete list.Zip;
    delete list.Union;
    delete list.GroupBy;
    delete list.Take;
    delete list.TakeWhile;
    delete list.Skip;
    delete list.SkipWhile;
    delete list.ensureLambda;
    delete list.ensureItems;
    delete list.Delinqify;
}

/**
 * Adds Linq methods to an array.
 * @template T The type of the items in @list.
 * @param {Array<T>} list The array to add the Linq methods to.
 * @returns {Array<T>} Returns an array with Linq methods attached.
 */
function Linqify(list) {

    if (!list || typeof list.length === 'undefined') {
        throw new Error('Linqify requires an array');
    }

    if (list._linqified) {
        return list;
    }

    list._linqified = true;

    var helper = new LinqJS.LinqCore();

    // Add extra methods to the INSTANCE

    Utilities.extend(list, {
        Where: function (lambda) {
            var filtered = helper.where(this, lambda);
            return Linqify(filtered);
        }
    });

    Utilities.extend(list, { Any: function (lambda) { return helper.any(this, lambda); } });
    Utilities.extend(list, { First: function (lambda) { return helper.first(this, lambda); } });
    Utilities.extend(list, { FirstOrDefault: function (lambda, defaultValue) { return helper.firstOrDefault(this, lambda, defaultValue); } });
    Utilities.extend(list, { Last: function (lambda) { return helper.last(this, lambda); } });
    Utilities.extend(list, { All: function (lambda) { return helper.all(this, lambda); } });
    Utilities.extend(list, { ForEach: function (lambda) { helper.forEach(this, lambda); } });
    //Utilities.extend(list, { GetEnumerator: helper.getEnumerator });
    Utilities.extend(list, { Aggregate: function (lambda) { return helper.aggregate(this, lambda); } });
    Utilities.extend(list, { AggregateWithSeed: function (lambda, seed) { return helper.aggregateWithSeed(this, lambda, seed); } });
    Utilities.extend(list, { AggregateWithSeedAndResultSelector: function (lambda, seed, resultSelector) { return helper.aggregateWithSeedAndResultSelector(this, lambda, seed, resultSelector); } });
    Utilities.extend(list, { Average: function () { return helper.average(this); } });
    Utilities.extend(list, { AverageWithTransform: function (transformerLambda) { return helper.averageWithTransform(this, transformerLambda); } });

    Utilities.extend(list, {
        Select: function (lambda) {
            var selected = helper.select(this, lambda);
            return Linqify(selected);
        }
    });

    Utilities.extend(list, {
        Concat: function (secondItems) {
            var concated = helper.concat(this, secondItems);
            return Linqify(concated);
        }
    });

    Utilities.extend(list, { Contains: function (value, comparerLambda) { return helper.contains(this, value, comparerLambda); } });
    Utilities.extend(list, { Count: function () { return helper.count(this); } });
    Utilities.extend(list, { DefaultIfEmpty: function (defaultValue) { return helper.defaultIfEmpty(this, defaultValue); } });

    Utilities.extend(list, {
        Distinct: function (comparerLambda) {
            var distincts = helper.distinct(this, comparerLambda);
            return Linqify(distincts);
        }
    });

    Utilities.extend(list, { ElementAt: function (index) { return helper.elementAt(this, index); } });

    Utilities.extend(list, {
        Except: function (secondItems, comparerLambda) {
            var excepted = helper.except(this, secondItems, comparerLambda);
            return Linqify(excepted);
        }
    });

    Utilities.extend(list, {
        Intersect: function (secondItems, comparerLambda) {
            var intersected = helper.intersect(this, secondItems, comparerLambda);
            return Linqify(intersected);
        }
    });

    Utilities.extend(list, { Max: function (comparerLambda) { return helper.max(this, comparerLambda); } });
    Utilities.extend(list, { Min: function (comparerLambda) { return helper.min(this, comparerLambda); } });

    Utilities.extend(list, {
        OrderBy: function (keySelectorLambda, comparerLambda) {
            var ordered = helper.orderBy(this, keySelectorLambda, comparerLambda);
            return Linqify(ordered);
        }
    });

    Utilities.extend(list, {
        OrderByDescending: function (keySelectorLambda, comparerLambda) {
            var ordered = helper.orderByDescending(this, keySelectorLambda, comparerLambda);
            return Linqify(ordered);
        }
    });

    Utilities.extend(list, { Sum: function (valueSelectorLambda) { return helper.sum(this, valueSelectorLambda); } });
    Utilities.extend(list, { Single: function (lambda) { return helper.single(this, lambda); } });
    Utilities.extend(list, { SingleOrDefault: function (lambda, defaultValue) { return helper.singleOrDefault(this, lambda, defaultValue); } });

    Utilities.extend(list, {
        Reverse: function () {
            var reversed = helper.reverse(this);
            return Linqify(reversed);
        }
    });

    Utilities.extend(list, {
        SelectMany: function (collectionSelectorLambda, transformLambda) {
            var many = helper.selectMany(this, collectionSelectorLambda, transformLambda);
            return Linqify(many);
        }
    });

    Utilities.extend(list, {
        Zip: function (items2, lambda) {
            var zipped = helper.zip(this, items2, lambda);
            return Linqify(zipped);
        }
    });

    Utilities.extend(list, {
        Union: function (secondItems, comparerLambda) {
            var unioned = helper.union(this, secondItems, comparerLambda);
            return Linqify(unioned);
        }
    });

    Utilities.extend(list, {
        GroupBy: function (keySelectorLambda) {
            var grouped = helper.groupBy(this, keySelectorLambda);
            return Linqify(grouped);
        }
    });

    Utilities.extend(list, {
        Take: function (count) {
            var taken = helper.take(this, count);
            return Linqify(taken);
        }
    });

    Utilities.extend(list, {
        TakeWhile: function (predicate) {
            var taken = helper.takeWhile(this, predicate);
            return Linqify(taken);
        }
    });

    Utilities.extend(list, {
        Skip: function (count) {
            var skipped = helper.skip(this, count);
            return Linqify(skipped);
        }
    });

    Utilities.extend(list, {
        SkipWhile: function (predicate) {
            var skipped = helper.skipWhile(this, predicate);
            return Linqify(skipped);
        }
    });

    Utilities.extend(list, {
        SetValue: function (value, indices) {
            helper.setValue(this, value, indices);
            return this;
        }
    });

    // Also include these 'internal' methods
    Utilities.extend(list, { ensureLambda: function (lambda) { return helper.ensureLambda(lambda); } });
    Utilities.extend(list, { ensureItems: function (list, canBeEmpty) { return helper.ensureItems(list, canBeEmpty); } });

    Utilities.extend(list, {
        Delinqify: function (predicate) {
            var skipped = helper.skipWhile(this, predicate);
            return Linqify(skipped);
        }
    });

    // todo
    // GroupJoin
    // Join
    // LongCount
    // SequenceEqual
    // SetValue (not LINQ but useful)
    // ToLookup ?
    // Range
    // Repeat

    return list;
}
