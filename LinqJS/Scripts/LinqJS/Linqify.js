/*jslint
    this: true, for: true, white: true
*/

"use strict";

/// <reference path="../Utilities/Extend.js" />
/// <reference path="linq-core.js" />

var linqJs = linqJs || {};

/**
 * Makes all arrays Linq-able.
 * @returns {LinqableArray} Returns an array with Linq functions attached.
 */
Array.prototype.linqify = function () {

    linqify(this);

    return this;
};

/** Stops an array being Linq-able.
 * @returns {[]} Returns an non-Linq-able.
 */
Array.prototype.deLinqify = function () {

    deLinqify(this);

    return this;
};

function deLinqify(list) {

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
function linqify(list) {

    if (!list || typeof list.length === 'undefined') {
        throw new Error('linqify requires an array');
    }

    if (list._linqified) {
        return list;
    }

    list._linqified = true;

    var helper = new linqJs.linqCore();

    // Add extra methods to the INSTANCE

    Utilities.extend(list, {
        where: function (lambda) {
            var filtered = helper.where(this, lambda);
            return linqify(filtered);
        }
    });

    Utilities.extend(list, { any: function (lambda) { return helper.any(this, lambda); } });
    Utilities.extend(list, { first: function (lambda) { return helper.first(this, lambda); } });
    Utilities.extend(list, { firstOrDefault: function (lambda, defaultValue) { return helper.firstOrDefault(this, lambda, defaultValue); } });
    Utilities.extend(list, { last: function (lambda) { return helper.last(this, lambda); } });
    Utilities.extend(list, { all: function (lambda) { return helper.all(this, lambda); } });
    Utilities.extend(list, { forEach: function (lambda) { helper.forEach(this, lambda); } });
    //Utilities.extend(list, { GetEnumerator: helper.getEnumerator });
    Utilities.extend(list, { aggregate: function (lambda) { return helper.aggregate(this, lambda); } });
    Utilities.extend(list, { aggregateWithSeed: function (lambda, seed) { return helper.aggregateWithSeed(this, lambda, seed); } });
    Utilities.extend(list, { aggregateWithSeedAndResultSelector: function (lambda, seed, resultSelector) { return helper.aggregateWithSeedAndResultSelector(this, lambda, seed, resultSelector); } });
    Utilities.extend(list, { average: function () { return helper.average(this); } });
    Utilities.extend(list, { averageWithTransform: function (transformerLambda) { return helper.averageWithTransform(this, transformerLambda); } });

    Utilities.extend(list, {
        select: function (lambda) {
            var selected = helper.select(this, lambda);
            return linqify(selected);
        }
    });

    Utilities.extend(list, {
        concat: function (secondItems) {
            var concated = helper.concat(this, secondItems);
            return linqify(concated);
        }
    });

    Utilities.extend(list, { contains: function (value, comparerLambda) { return helper.contains(this, value, comparerLambda); } });
    Utilities.extend(list, { count: function () { return helper.count(this); } });
    Utilities.extend(list, { defaultIfEmpty: function (defaultValue) { return helper.defaultIfEmpty(this, defaultValue); } });

    Utilities.extend(list, {
        distinct: function (comparerLambda) {
            var distincts = helper.distinct(this, comparerLambda);
            return linqify(distincts);
        }
    });

    Utilities.extend(list, { elementAt: function (index) { return helper.elementAt(this, index); } });

    Utilities.extend(list, {
        except: function (secondItems, comparerLambda) {
            var excepted = helper.except(this, secondItems, comparerLambda);
            return linqify(excepted);
        }
    });

    Utilities.extend(list, {
        intersect: function (secondItems, comparerLambda) {
            var intersected = helper.intersect(this, secondItems, comparerLambda);
            return linqify(intersected);
        }
    });

    Utilities.extend(list, { max: function (comparerLambda) { return helper.max(this, comparerLambda); } });
    Utilities.extend(list, { min: function (comparerLambda) { return helper.min(this, comparerLambda); } });

    Utilities.extend(list, {
        orderBy: function (keySelectorLambda, comparerLambda) {
            var ordered = helper.orderBy(this, keySelectorLambda, comparerLambda);
            return linqify(ordered);
        }
    });

    Utilities.extend(list, {
        orderByDescending: function (keySelectorLambda, comparerLambda) {
            var ordered = helper.orderByDescending(this, keySelectorLambda, comparerLambda);
            return linqify(ordered);
        }
    });

    Utilities.extend(list, { sum: function (valueSelectorLambda) { return helper.sum(this, valueSelectorLambda); } });
    Utilities.extend(list, { single: function (lambda) { return helper.single(this, lambda); } });
    Utilities.extend(list, { singleOrDefault: function (lambda, defaultValue) { return helper.singleOrDefault(this, lambda, defaultValue); } });

    Utilities.extend(list, {
        reverse: function () {
            var reversed = helper.reverse(this);
            return linqify(reversed);
        }
    });

    Utilities.extend(list, {
        selectMany: function (collectionSelectorLambda, transformLambda) {
            var many = helper.selectMany(this, collectionSelectorLambda, transformLambda);
            return linqify(many);
        }
    });

    Utilities.extend(list, {
        zip: function (items2, lambda) {
            var zipped = helper.zip(this, items2, lambda);
            return linqify(zipped);
        }
    });

    Utilities.extend(list, {
        union: function (secondItems, comparerLambda) {
            var unioned = helper.union(this, secondItems, comparerLambda);
            return linqify(unioned);
        }
    });

    Utilities.extend(list, {
        groupBy: function (keySelectorLambda) {
            var grouped = helper.groupBy(this, keySelectorLambda);
            return linqify(grouped);
        }
    });

    Utilities.extend(list, {
        take: function (count) {
            var taken = helper.take(this, count);
            return linqify(taken);
        }
    });

    Utilities.extend(list, {
        takeWhile: function (predicate) {
            var taken = helper.takeWhile(this, predicate);
            return linqify(taken);
        }
    });

    Utilities.extend(list, {
        skip: function (count) {
            var skipped = helper.skip(this, count);
            return linqify(skipped);
        }
    });

    Utilities.extend(list, {
        skipWhile: function (predicate) {
            var skipped = helper.skipWhile(this, predicate);
            return linqify(skipped);
        }
    });

    Utilities.extend(list, {
        setValue: function (value, indices) {
            helper.setValue(this, value, indices);
            return this;
        }
    });

    // Also include these 'internal' methods
    Utilities.extend(list, { ensureLambda: function (lambda) { return helper.ensureLambda(lambda); } });
    Utilities.extend(list, { ensureItems: function (list, canBeEmpty) { return helper.ensureItems(list, canBeEmpty); } });

    Utilities.extend(list, {
        delinqify: function (predicate) {
            var skipped = helper.skipWhile(this, predicate);
            return linqify(skipped);
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
