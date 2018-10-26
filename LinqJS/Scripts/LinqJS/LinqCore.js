/*jslint
    this: true, for: true, white: true
*/

/// <reference path="EnumerableSorter.js" />

"use strict";

var LinqJS = LinqJS || {};

/**
 * .Net Linq-like functions for JavaScript arrays - by Anthony Chambers.
 */
LinqJS.LinqCore = (function () {

    /** 
     * Initialises a new LinqCore instance
     * @constructor
     */
    function LinqCore() {

    }

    LinqCore.prototype.helloWorld = function () {

        return "Hello, World!";
    };

    /// Checks the specified object is a function
    LinqCore.prototype.ensureLambda = function (lambda) {

        if (typeof lambda !== "function") {
            throw new Error("lambda must be a function");
        }
    };

    /// Checks the specified object is a function, if it isn't null
    LinqCore.prototype.ensureLambdaIfNotNull = function (lambda) {

        if (lambda != null) {
            this.ensureLambda(lambda);
        }
    };

    /// Checks the specified object is an array containing at least 1 item
    LinqCore.prototype.ensureItems = function (list, canBeEmpty) {

        if (list == null) {
            throw new Error("Array must not be null");
        }

        if (!this.isArray(list)) {
            throw new Error("list must be an array");
        }

        if (list.length === 0 && canBeEmpty !== true) {
            throw new Error("Array must contain at least one item");
        }

        return true;
    };

    /// Determines if the specified object is an array
    LinqCore.prototype.isArray = function (obj) {

        if (obj == null) {
            throw new Error("obj must not be null");
        }

        if (Object.prototype.toString.call(obj) !== '[object Array]') {
            return false;
        }

        return true;
    };

    /// where
    LinqCore.prototype.where = function (items, lambda) {

        this.ensureLambda(lambda);

        var results = [];

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (lambda(valueOfElement, indexInArray)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// any
    LinqCore.prototype.any = function (items, lambda) {

        if (lambda == null) {
            return items.length > 0;
        }

        this.ensureLambda(lambda);

        var item;
        var idx;

        for (idx = 0; idx < items.length; idx += 1) {
            item = items[idx];

            if (lambda(item)) {
                return true;
            }
        }

        return false;
    };

    /// first
    LinqCore.prototype.first = function (items, lambda) {

        if (lambda == null) {

            this.ensureItems(items);

            return items[0];
        }

        this.ensureLambda(lambda);

        var item;
        var idx;

        for (idx = 0; idx < items.length; idx += 1) {
            item = items[idx];

            if (lambda(item)) {
                return item;
            }
        }

        throw new Error("Array contains no matching items");
    };

    /// firstOrDefault
    LinqCore.prototype.firstOrDefault = function (items, lambda, defaultValue) {

        this.ensureLambdaIfNotNull(lambda);

        if (lambda == null) {

            this.ensureItems(items, true);

            return items.length === 0 ? defaultValue : items[0];
        }

        var item;
        var idx;

        for (idx = 0; idx < items.length; idx += 1) {
            item = items[idx];

            if (lambda(item)) {
                return item;
            }
        }

        return defaultValue;
    };

    /// last
    LinqCore.prototype.last = function (items, lambda) {

        if (lambda == null) {

            this.ensureItems(items);

            return items[items.length - 1];
        }

        this.ensureLambda(lambda);

        var item;
        var idx;

        for (idx = items.length - 1; idx >= 0; idx -= 1) {
            item = items[idx];

            if (lambda(item)) {
                return item;
            }
        }

        throw new Error("Array contains no matching items");
    };

    /// all
    LinqCore.prototype.all = function (items, lambda) {

        this.ensureLambda(lambda);

        var item;
        var idx;

        for (idx = 0; idx < items.length; idx += 1) {
            item = items[idx];

            if (!lambda(item)) {
                return false;
            }
        }

        return true;
    };

    /** forEach Performs an operation on each item in the array.
    @param {array} items The array to iterate over.
    @param {function} lambda The function to run against each item.
    */
    LinqCore.prototype.forEach = function (items, lambda) {

        this.ensureItems(items, true);
        this.ensureLambda(lambda);
        var indexInArray;
        var valueOfElement;

        for (indexInArray = 0; indexInArray < items.length; indexInArray += 1) {
            valueOfElement = items[indexInArray];

            if (lambda(indexInArray, valueOfElement) === false) {
                break;
            }
        }
    };

    /// aggregate
    LinqCore.prototype.aggregate = function (items, lambda) {

        this.ensureLambda(lambda);
        this.ensureItems(items);
        var result = null;

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = lambda(result, valueOfElement);
        });

        return result;
    };

    /// aggregateWithSeed
    LinqCore.prototype.aggregateWithSeed = function (items, lambda, seed) {

        this.ensureLambda(lambda);
        this.ensureItems(items);

        var result = seed;

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = lambda(result, valueOfElement);
        });

        return result;
    };

    /// aggregateWithSeedAndResultSelector
    LinqCore.prototype.aggregateWithSeedAndResultSelector = function (items, lambda, seed, resultSelector) {

        this.ensureLambda(lambda);
        this.ensureLambda(resultSelector);

        var result = seed;

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = lambda(result, valueOfElement);
        });

        result = resultSelector(result);

        return result;
    };

    /// average
    LinqCore.prototype.average = function (items) {

        var total = 0;

        this.forEach(items, function (indexInArray, valueOfElement) {

            total += valueOfElement;
        });

        var avg = total / items.length;

        return avg;
    };

    /// averageWithTransform
    LinqCore.prototype.averageWithTransform = function (items, transformerLambda) {

        this.ensureLambda(transformerLambda);

        var total = 0;
        var value;

        this.forEach(items, function (indexInArray, valueOfElement) {

            value = transformerLambda(valueOfElement);
            total += value;
        });

        var avg = total / items.length;

        return avg;
    };

    /// select
    LinqCore.prototype.select = function (items, lambda) {

        this.ensureItems(items, true);

        var results = [];
        var item;

        this.forEach(items, function (indexInArray, valueOfElement) {

            item = lambda(valueOfElement, indexInArray);
            results.push(item);
        });

        return results;
    };

    /// concat
    LinqCore.prototype.concat = function (firstItems, secondItems) {

        var results = [];

        results.push.apply(results, firstItems);

        results.push.apply(results, secondItems);

        return results;
    };

    /// contains
    LinqCore.prototype.contains = function (items, value, comparerLambda) {

        if (typeof comparerLambda !== "function") {
            comparerLambda = function (first, second) {
                return first == second;
            };
        }

        var result = false;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (comparerLambda(valueOfElement, value)) {
                result = true;
                return false; // break out of forEach
            }
        });

        return result;
    };

    /// count
    LinqCore.prototype.count = function (items) {

        this.ensureItems(items, true);

        return items.length;
    };

    /// defaultIfEmpty
    LinqCore.prototype.defaultIfEmpty = function (items, defaultValue) {

        if (items != null && items.length > 0) {
            return items;
        }

        return [defaultValue];
    };

    /// distinct
    LinqCore.prototype.distinct = function (items, comparerLambda) {

        var self = this;
        var results = [];

        self.forEach(items, function (indexInArray, valueOfElement) {

            if (!self.contains(results, valueOfElement, comparerLambda)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// elementAt
    LinqCore.prototype.elementAt = function (items, index) {

        if (items.length > index) {
            return items[index];
        }

        return null;
    };

    /// except
    LinqCore.prototype.except = function (firstItems, secondItems, comparerLambda) {

        var self = this;
        var results = [];

        firstItems = this.distinct(firstItems, comparerLambda);
        secondItems = this.distinct(secondItems, comparerLambda);

        this.forEach(firstItems, function (indexInArray, valueOfElement) {

            if (!self.contains(secondItems, valueOfElement, comparerLambda)) {
                results.push(valueOfElement);
            }
        });

        this.forEach(secondItems, function (indexInArray, valueOfElement) {

            if (!self.contains(firstItems, valueOfElement, comparerLambda)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// intersect
    LinqCore.prototype.intersect = function (firstItems, secondItems, comparerLambda) {

        var self = this;
        var results = [];

        firstItems = this.distinct(firstItems, comparerLambda);

        this.forEach(firstItems, function (indexInArray, valueOfElement) {

            if (self.contains(secondItems, valueOfElement, comparerLambda)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// max
    LinqCore.prototype.max = function (items, comparerLambda) {

        if (typeof comparerLambda !== "function") {
            comparerLambda = function (first, second) {
                return first > second;
            };
        }

        var result;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (!result || comparerLambda(valueOfElement, result)) {
                result = valueOfElement;
            }
        });

        return result;
    };

    /// min
    LinqCore.prototype.min = function (items, comparerLambda) {

        if (typeof comparerLambda !== "function") {
            comparerLambda = function (first, second) {
                return first < second;
            };
        }

        var result;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (!result || comparerLambda(valueOfElement, result)) {
                result = valueOfElement;
            }
        });

        return result;
    };

    /// orderBy
    LinqCore.prototype.orderBy = function (items, keySelectorLambda, comparerLambda) {

        this.ensureItems(items, true);

        items = items.slice(); // Clone the array so .sort doesn't re-order the original

        this.ensureLambdaIfNotNull(keySelectorLambda);

        this.ensureLambdaIfNotNull(comparerLambda);

        if (keySelectorLambda == null) {
            keySelectorLambda = function (o) { return o; };
        }

        var comparefn;

        if (comparerLambda == null) {
            comparefn = function (a, b) {

                if (keySelectorLambda(a) < keySelectorLambda(b)) {
                    return -1;
                }

                if (keySelectorLambda(a) > keySelectorLambda(b)) {
                    return 1;
                }

                return 0;

            };
        } else {
            comparefn = function (a, b) {
                a = keySelectorLambda(a);
                b = keySelectorLambda(b);

                return comparerLambda(a, b);
            };
        }

        items.sort(comparefn);

        return items;
    };

    /// orderByDescending
    LinqCore.prototype.orderByDescending = function (items, keySelectorLambda, comparerLambda) {

        return this.orderBy(items, keySelectorLambda, comparerLambda).reverse();
    };

    /// sum

    /** sum Calculates the sum total of the items
    * @param {array} items The array to sum up.
    * @param {function(any, number):number} [valueSelectorLambda] Optional function that transforms, or selects a property of, the items before summing them.
    * @returns {number} Returns a number representing the sum total.
    */
    LinqCore.prototype.sum = function (items, valueSelectorLambda) {

        this.ensureItems(items, true);

        if (valueSelectorLambda == null) {

            valueSelectorLambda = function (o) {

                var parsed = parseFloat(o);

                return isNaN(parsed) ? 0 : parsed;
            };
        }

        var total = 0;

        this.forEach(items, function (indexInArray, valueOfElement) {

            total += valueSelectorLambda(valueOfElement, indexInArray);
        });

        return total;
    };

    /// single
    LinqCore.prototype.single = function (items, lambda) {

        this.ensureItems(items);

        var count = 0;

        if (typeof lambda !== "function") {
            lambda = function () {
                return true;
            };
        }

        var result;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (lambda(valueOfElement)) {
                result = valueOfElement;
                count += 1;
            }
        });

        switch (count) {
            case 0: throw new Error("No match found");
            case 1: return result;
        }

        throw new Error("More than 1 match found");
    };

    /// singleOrDefault
    LinqCore.prototype.singleOrDefault = function (items, lambda, defaultValue) {

        this.ensureItems(items);

        if (defaultValue === undefined) {
            throw new Error("defaultValue must be provided");
        }

        var count = 0;

        if (typeof lambda !== "function") {
            lambda = function () {
                return true;
            };
        }

        var result;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (lambda(valueOfElement)) {
                result = valueOfElement;
                count += 1;
            }
        });

        switch (count) {
            case 0: return defaultValue;
            case 1: return result;
        }

        throw new Error("More than 1 match found");
    };

    /// reverse
    LinqCore.prototype.reverse = function (items) {

        if (items == null) {
            throw new Error("Array must not be null");
        }

        if (items.length === 0) {
            return items;
        }

        items = items.slice(); // Clone the array so .reverse doesn't re-order the original

        return items.reverse();
    };

    /// selectMany
    LinqCore.prototype.selectMany = function (items, collectionSelectorLambda, transformLambda) {

        var self = this;
        this.ensureItems(items, true);
        this.ensureLambda(collectionSelectorLambda);
        this.ensureLambdaIfNotNull(transformLambda);

        if (items.length === 0) {
            return items;
        }

        var result = [];
        var subElements;
        var o;

        this.forEach(items, function (indexInArray, valueOfElement) {

            subElements = collectionSelectorLambda(valueOfElement);

            self.forEach(subElements, function (subIndexInArray, subValueOfElement) {

                if (transformLambda) {
                    o = transformLambda(subValueOfElement, indexInArray);
                    result.push(o);
                } else {
                    result.push(subValueOfElement);
                }
            });
        });

        return result;
    };

    /// zip
    LinqCore.prototype.zip = function (items1, items2, lambda) {

        this.ensureItems(items1);
        this.ensureItems(items2);
        this.ensureLambda(lambda);

        var result = [];
        var item;

        this.forEach(items1, function (indexInArray, valueOfElement) {

            if (items2.length >= indexInArray + 1) {
                item = lambda(valueOfElement, items2[indexInArray]);
                result.push(item);
            }
            else {
                return false; // break out of forEach
            }
        });

        return result;
    };

    /// union
    LinqCore.prototype.union = function (firstItems, secondItems, comparerLambda) {

        var self = this;
        var results = [];

        firstItems = this.distinct(firstItems, comparerLambda);
        secondItems = this.distinct(secondItems, comparerLambda);
        results.push.apply(results, firstItems);

        this.forEach(secondItems, function (indexInArray, valueOfElement) {

            if (!self.contains(results, valueOfElement, comparerLambda)) {
                results.push(valueOfElement);
            }
        });

        delete results.enumerator;

        return results;
    };

    /// groupBy
    LinqCore.prototype.groupBy = function (items, keySelectorLambda) {

        var self = this;
        this.ensureLambda(keySelectorLambda);
        var groups = [];

        if (items == null || items.length === 0) {
            return groups;
        }

        var itemGroupKey;
        /** @type {{ Key: any, Items: [] }} */
        var group;
        var firstOrDefaultLambda = function (o) { return o.Key == itemGroupKey; };

        self.forEach(items, function (indexInArray, valueOfElement) {

            // Get item's key
            itemGroupKey = keySelectorLambda(valueOfElement);

            // Look for the item's expected group
            group = self.firstOrDefault(
                groups,
                firstOrDefaultLambda,
                { Key: itemGroupKey, /*Count: 0*/ Items: [] });

            if (/*group.Count === 0*/ group.Items.length === 0) {
                groups.push(group);
            }

            group.Items.push(valueOfElement);

            //group.Count += 1;
        });

        return groups;
    };

    /// take
    LinqCore.prototype.take = function (items, count) {

        this.ensureItems(items, true);

        var results = [];

        if (count <= 0) {
            return results;
        }

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (indexInArray < count) {
                results.push(valueOfElement);
            }
            else {
                return false;
            }
        });

        return results;
    };

    /// takeWhile
    LinqCore.prototype.takeWhile = function (items, predicate) {

        this.ensureItems(items, true);

        var results = [];

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (predicate(valueOfElement, indexInArray)) {
                results.push(valueOfElement);
            } else {
                return false; // break out of forEach
            }
        });

        return results;
    };

    /// skip
    LinqCore.prototype.skip = function (items, count) {

        this.ensureItems(items, true);

        var results = [];

        if (count <= 0) {
            return results;
        }

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (indexInArray + 1 > count) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// skipWhile
    LinqCore.prototype.skipWhile = function (items, predicate) {

        this.ensureItems(items, true);

        var results = [];
        var yielding = false;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (!yielding && !predicate(valueOfElement, indexInArray)) {
                yielding = true;
            }

            if (yielding) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// setValue
    LinqCore.prototype.setValue = function (arr, value, indices) {

        this.ensureItems(arr, true);

        if (typeof indices === "number") {
            indices = [indices];
        }

        this.ensureItems(indices, false);

        var currentDimensionArray = arr;
        var currentIndicee = -1;
        var i;

        for (i = 0; i < indices.length; i += 1) {

            currentIndicee = indices[i];

            if (i < indices.length - 1) {
                currentDimensionArray = currentDimensionArray[indices[i]];
            }
        }

        currentDimensionArray[currentIndicee] = value;
    };

    /* todo - use 'each' instead of Enumerator
    
        each: function( obj, callback ) {
            var length, i = 0;
    
                if ( isArray ) {
                    for ( ; i < length; i++ ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );
    
                        if ( value === false ) {
                            break;
                        }
                    }
                } else {
                    for ( i in obj ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );
    
                        if ( value === false ) {
                            break;
                        }
                    }
                }
    
            return obj;
        }
    
    */

    /// each
    LinqCore.prototype.each = function (items, lambda) {

        // lambda should be function(indexInArray, valueOfElement) { .... }
        this.ensureLambda(lambda);

        var value;
        var i;
        var length = items.length;
        var isArr = this.isArray(items);

        if (isArr) {
            for (i = 0; i < length; i += 1) {
                value = lambda.call(items[i], i, items[i]);

                if (value === false) {
                    break;
                }
            }
        } else {
            for (i in items) {
                value = lambda.call(items[i], i, items[i]);

                if (value === false) {
                    break;
                }
            }
        }

        return items;
    };

    // join
    LinqCore.prototype.join = function (items) {

    };

    /**
     * IEnumerable<TResult>
     * @param {array} outer Outer array
     * @param {array} inner Inner array
     * @param {function} outerKeySelector Outer array key selector function
     * @param {function} innerKeySelector Inner array key selector function
     * @param {function} resultSelector Result selector function
     * @param {any} comparer Comparer
    */
    function JoinIterator(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {

        var results = [];

        //this.forEach(

        //using(IEnumerator < TOuter > e = outer.GetEnumerator())
        //{
        //    if (e.MoveNext()) {
        //        Lookup < TKey, TInner > lookup = Lookup<TKey, TInner>.CreateForJoin(inner, innerKeySelector, comparer);
        //        if (lookup.Count != 0) {
        //            do {
        //                TOuter item = e.Current;
        //                Grouping < TKey, TInner > g = lookup.GetGrouping(outerKeySelector(item), create: false);
        //                if (g != null) {
        //                    int count = g._count;
        //                    TInner[] elements = g._elements;
        //                    for (int i = 0; i != count; ++i)
        //                    {
        //                        yield return resultSelector(item, elements[i]);
        //                    }
        //                }
        //            }
        //            while (e.MoveNext());
        //        }
        //    }
        //}
    }


    // Return the constructor
    return LinqCore;

})();
