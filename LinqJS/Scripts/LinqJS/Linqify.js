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
    delete list.where;
    delete list.any;
    delete list.first;
    delete list.firstOrDefault;
    delete list.last;
    delete list.all;
    delete list.forEach;
    delete list.aggregate;
    delete list.aggregateWithSeed;
    delete list.aggregateWithSeedAndResultSelector;
    delete list.average;
    delete list.averageWithTransform;
    delete list.select;
    delete list.concat;
    delete list.contains;
    delete list.count;
    delete list.defaultIfEmpty;
    delete list.distinct;
    delete list.elementAt;
    delete list.except;
    delete list.intersect;
    delete list.max;
    delete list.min;
    delete list.orderBy;
    delete list.orderByDescending;
    delete list.sum;
    delete list.single;
    delete list.singleOrDefault;
    delete list.reverse;
    delete list.selectMany;
    delete list.zip;
    delete list.union;
    delete list.groupBy;
    delete list.take;
    delete list.takeWhile;
    delete list.skip;
    delete list.skipWhile;
    delete list.ensureLambda;
    delete list.ensureItems;
    delete list.delinqify;
}

/**
 * Adds extra properties/functions to an INSTANCE of a type.
 * @param {any} dst
 * @returns {any}
 */
function extend(dst) {

    var hashKey = dst.$$hashKey;

    _forEach(arguments, function (obj) {

        if (obj !== dst) {
            _forEach(obj, function (value, key) {
                dst[key] = value;
            });
        }
    });

    setHashKey(dst, hashKey);

    return dst;

    function _forEach(obj, iterator, context) {

        var key;

        if (obj) {
            if (isFunction(obj)) {
                for (key in obj) {
                    if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            }
            else if (obj._forEach && obj._forEach !== _forEach) {
                obj._forEach(iterator, context);
            }
            else if (isArrayLike(obj)) {
                for (key = 0; key < obj.length; key++) {
                    iterator.call(context, obj[key], key);
                }
            }
            else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            }
        }

        return obj;
    }

    function isFunction(value) {

        return typeof value === 'function';
    }

    function isArrayLike(obj) {

        if (obj == null || isWindow(obj)) {
            return false;
        }

        var length = obj.length;

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return isString(obj) || isArray(obj) || length === 0 ||
            typeof length === 'number' && length > 0 && (length - 1) in obj;
    }

    function isWindow(obj) {

        return obj && obj.document && obj.location && obj.alert && obj.setInterval;
    }

    function isString(value) {

        return typeof value === 'string';
    }

    function isArray(value) {

        return Object.prototype.toString.apply(value) === '[object Array]';
    }

    function setHashKey(obj, hashKey) {

        if (hashKey) {
            obj.$$hashKey = hashKey;
        }
        else {
            delete obj.$$hashKey;
        }
    }
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

    var _linqCore = new linqJs.linqCore();

    // Add extra methods to the INSTANCE

    extend(list, {
        where: function (lambda) {
            var filtered = _linqCore.where(this, lambda);
            return linqify(filtered);
        }
    });

    extend(list, { any: function (lambda) { return _linqCore.any(this, lambda); } });
    extend(list, { first: function (lambda) { return _linqCore.first(this, lambda); } });
    extend(list, { firstOrDefault: function (lambda, defaultValue) { return _linqCore.firstOrDefault(this, lambda, defaultValue); } });
    extend(list, { last: function (lambda) { return _linqCore.last(this, lambda); } });
    extend(list, { all: function (lambda) { return _linqCore.all(this, lambda); } });
    extend(list, { forEach: function (lambda) { _linqCore.forEach(this, lambda); } });
    //extend(list, { getEnumerator: _linqCore.getEnumerator });
    extend(list, { aggregate: function (lambda) { return _linqCore.aggregate(this, lambda); } });
    extend(list, { aggregateWithSeed: function (lambda, seed) { return _linqCore.aggregateWithSeed(this, lambda, seed); } });
    extend(list, { aggregateWithSeedAndResultSelector: function (lambda, seed, resultSelector) { return _linqCore.aggregateWithSeedAndResultSelector(this, lambda, seed, resultSelector); } });
    extend(list, { average: function () { return _linqCore.average(this); } });
    extend(list, { averageWithTransform: function (transformerLambda) { return _linqCore.averageWithTransform(this, transformerLambda); } });

    extend(list, {
        select: function (lambda) {
            var selected = _linqCore.select(this, lambda);
            return linqify(selected);
        }
    });

    extend(list, {
        concat: function (secondItems) {
            var concated = _linqCore.concat(this, secondItems);
            return linqify(concated);
        }
    });

    extend(list, { contains: function (value, comparerLambda) { return _linqCore.contains(this, value, comparerLambda); } });
    extend(list, { count: function () { return _linqCore.count(this); } });
    extend(list, { defaultIfEmpty: function (defaultValue) { return _linqCore.defaultIfEmpty(this, defaultValue); } });

    extend(list, {
        distinct: function (comparerLambda) {
            var distincts = _linqCore.distinct(this, comparerLambda);
            return linqify(distincts);
        }
    });

    extend(list, { elementAt: function (index) { return _linqCore.elementAt(this, index); } });

    extend(list, {
        except: function (secondItems, comparerLambda) {
            var excepted = _linqCore.except(this, secondItems, comparerLambda);
            return linqify(excepted);
        }
    });

    extend(list, {
        intersect: function (secondItems, comparerLambda) {
            var intersected = _linqCore.intersect(this, secondItems, comparerLambda);
            return linqify(intersected);
        }
    });

    extend(list, { max: function (comparerLambda) { return _linqCore.max(this, comparerLambda); } });
    extend(list, { min: function (comparerLambda) { return _linqCore.min(this, comparerLambda); } });

    extend(list, {
        orderBy: function (keySelectorLambda, comparerLambda) {
            var ordered = _linqCore.orderBy(this, keySelectorLambda, comparerLambda);
            return linqify(ordered);
        }
    });

    extend(list, {
        orderByDescending: function (keySelectorLambda, comparerLambda) {
            var ordered = _linqCore.orderByDescending(this, keySelectorLambda, comparerLambda);
            return linqify(ordered);
        }
    });

    extend(list, { sum: function (valueSelectorLambda) { return _linqCore.sum(this, valueSelectorLambda); } });
    extend(list, { single: function (lambda) { return _linqCore.single(this, lambda); } });
    extend(list, { singleOrDefault: function (lambda, defaultValue) { return _linqCore.singleOrDefault(this, lambda, defaultValue); } });

    extend(list, {
        reverse: function () {
            var reversed = _linqCore.reverse(this);
            return linqify(reversed);
        }
    });

    extend(list, {
        selectMany: function (collectionSelectorLambda, transformLambda) {
            var many = _linqCore.selectMany(this, collectionSelectorLambda, transformLambda);
            return linqify(many);
        }
    });

    extend(list, {
        zip: function (items2, lambda) {
            var zipped = _linqCore.zip(this, items2, lambda);
            return linqify(zipped);
        }
    });

    extend(list, {
        union: function (secondItems, comparerLambda) {
            var unioned = _linqCore.union(this, secondItems, comparerLambda);
            return linqify(unioned);
        }
    });

    extend(list, {
        groupBy: function (keySelectorLambda) {
            var grouped = _linqCore.groupBy(this, keySelectorLambda);
            return linqify(grouped);
        }
    });

    extend(list, {
        take: function (count) {
            var taken = _linqCore.take(this, count);
            return linqify(taken);
        }
    });

    extend(list, {
        takeWhile: function (predicate) {
            var taken = _linqCore.takeWhile(this, predicate);
            return linqify(taken);
        }
    });

    extend(list, {
        skip: function (count) {
            var skipped = _linqCore.skip(this, count);
            return linqify(skipped);
        }
    });

    extend(list, {
        skipWhile: function (predicate) {
            var skipped = _linqCore.skipWhile(this, predicate);
            return linqify(skipped);
        }
    });

    extend(list, {
        setValue: function (value, indices) {
            _linqCore.setValue(this, value, indices);
            return this;
        }
    });

    // Also include these 'internal' methods
    extend(list, { ensureLambda: function (lambda) { return _linqCore.ensureLambda(lambda); } });
    extend(list, { ensureItems: function (list, canBeEmpty) { return _linqCore.ensureItems(list, canBeEmpty); } });

    extend(list, {
        delinqify: function (predicate) {
            var skipped = _linqCore.skipWhile(this, predicate);
            return linqify(skipped);
        }
    });

    // todo:
    //  GroupJoin
    //  Join
    //  LongCount
    //  SequenceEqual
    //  SetValue (not LINQ but useful)
    //  ToLookup ?
    //  Range
    //  Repeat

    return list;
}
