/*jslint
    this: true, for: true, white: true
*/

"use strict";

/// <reference path="./linq-core.js" />

const linqCoreModule = require('./linq-core');

/**
 * Removes Linq functions from a previously linqified array.
 * @param {ArrayLike} list 
 */
/*export*/
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
    delete list.ensureFunc;
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

    var _linqCore = new linqCoreModule();

    // Add extra methods to the INSTANCE

    extend(list, {
        where: function (predicate) {
            var filtered = _linqCore.where(this, predicate);
            return linqify(filtered);
        }
    });

    extend(list, { any: function (predicate) { return _linqCore.any(this, predicate); } });
    extend(list, { first: function (predicate) { return _linqCore.first(this, predicate); } });
    extend(list, { firstOrDefault: function (predicate, defaultValue) { return _linqCore.firstOrDefault(this, predicate, defaultValue); } });
    extend(list, { last: function (predicate) { return _linqCore.last(this, predicate); } });
    extend(list, { all: function (predicate) { return _linqCore.all(this, predicate); } });
    extend(list, { forEach: function (predicate) { _linqCore.forEach(this, predicate); } });
    //extend(list, { getEnumerator: _linqCore.getEnumerator });
    //extend(list, { getEnumerator: function () { return new Utilities.Enumerator(this); } });
    extend(list, { aggregate: function (predicate) { return _linqCore.aggregate(this, predicate); } });
    extend(list, { aggregateWithSeed: function (predicate, seed) { return _linqCore.aggregateWithSeed(this, predicate, seed); } });
    extend(list, { aggregateWithSeedAndResultSelector: function (predicate, seed, resultSelector) { return _linqCore.aggregateWithSeedAndResultSelector(this, predicate, seed, resultSelector); } });
    extend(list, { average: function () { return _linqCore.average(this); } });
    extend(list, { averageWithTransform: function (transformerFunc) { return _linqCore.averageWithTransform(this, transformerFunc); } });

    extend(list, {
        select: function (transformFunc) {
            var selected = _linqCore.select(this, transformFunc);
            return linqify(selected);
        }
    });

    extend(list, {
        concat: function (secondItems) {
            var concated = _linqCore.concat(this, secondItems);
            return linqify(concated);
        }
    });

    extend(list, { contains: function (value, comparerPredicate) { return _linqCore.contains(this, value, comparerPredicate); } });
    extend(list, { count: function () { return _linqCore.count(this); } });
    extend(list, { defaultIfEmpty: function (defaultValue) { return _linqCore.defaultIfEmpty(this, defaultValue); } });

    extend(list, {
        distinct: function (comparerPredicate) {
            var distincts = _linqCore.distinct(this, comparerPredicate);
            return linqify(distincts);
        }
    });

    extend(list, { elementAt: function (index) { return _linqCore.elementAt(this, index); } });

    extend(list, {
        except: function (secondItems, comparerPredicate) {
            var excepted = _linqCore.except(this, secondItems, comparerPredicate);
            return linqify(excepted);
        }
    });

    extend(list, {
        intersect: function (secondItems, comparerPredicate) {
            var intersected = _linqCore.intersect(this, secondItems, comparerPredicate);
            return linqify(intersected);
        }
    });

    extend(list, { max: function (comparerPredicate) { return _linqCore.max(this, comparerPredicate); } });
    extend(list, { min: function (comparerPredicate) { return _linqCore.min(this, comparerPredicate); } });

    extend(list, {
        orderBy: function (keySelectorFunc, comparerPredicate) {
            var ordered = _linqCore.orderBy(this, keySelectorFunc, comparerPredicate);
            return linqify(ordered);
        }
    });

    extend(list, {
        orderByDescending: function (keySelectorFunc, comparerPredicate) {
            var ordered = _linqCore.orderByDescending(this, keySelectorFunc, comparerPredicate);
            return linqify(ordered);
        }
    });

    extend(list, { sum: function (valueSelectorFunc) { return _linqCore.sum(this, valueSelectorFunc); } });
    extend(list, { single: function (predicate) { return _linqCore.single(this, predicate); } });
    extend(list, { singleOrDefault: function (predicate, defaultValue) { return _linqCore.singleOrDefault(this, predicate, defaultValue); } });

    extend(list, {
        reverse: function () {
            var reversed = _linqCore.reverse(this);
            return linqify(reversed);
        }
    });

    extend(list, {
        selectMany: function (collectionSelectorFunc, transformFunc) {
            var many = _linqCore.selectMany(this, collectionSelectorFunc, transformFunc);
            return linqify(many);
        }
    });

    extend(list, {
        zip: function (items2, predicate) {
            var zipped = _linqCore.zip(this, items2, predicate);
            return linqify(zipped);
        }
    });

    extend(list, {
        union: function (secondItems, comparerPredicate) {
            var unioned = _linqCore.union(this, secondItems, comparerPredicate);
            return linqify(unioned);
        }
    });

    extend(list, {
        groupBy: function (keySelectorFunc) {
            var grouped = _linqCore.groupBy(this, keySelectorFunc);
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
    extend(list, { ensureFunc: function (func) { return _linqCore.ensureFunc(func); } });
    extend(list, { ensureFuncIfNotNull: function (func) { return _linqCore.ensureFuncIfNotNull(func); } });
    extend(list, { ensureItems: function (list, canBeEmpty) { return _linqCore.ensureItems(list, canBeEmpty); } });

    extend(list, {
        delinqify: function () {
            deLinqify(this);
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

module.exports.linqify = linqify
module.exports.deLinqify = deLinqify
