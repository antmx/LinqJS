/*jslint
    this: true, for: true, white: true
*/

"use strict";

var linqJs = linqJs || {};

/**
 * .Net Linq-like functions for JavaScript arrays - by Anthony Chambers.
 */
linqJs.linqCore = (function () {

    /** 
     * Initialises a new linqCore instance
     * @constructor
     */
    function linqCore() {

    }

    linqCore.prototype.helloWorld = function () {

        return "Hello, World!";
    };

    /**
     * Checks the specified object is a (lanbda) function
     * @param {any} lambda the object to test for being an function
     */
    linqCore.prototype.ensureLambda = function (lambda) {

        if (typeof lambda !== "function") {
            throw new Error("lambda must be a function");
        }
    };

    /**
     * Checks the specified object is a function, if it isn't null
     * @param {Function} lambda
     */
    linqCore.prototype.ensureLambdaIfNotNull = function (lambda) {

        if (lambda != null) {
            this.ensureLambda(lambda);
        }
    };

    /**
     * Checks the specified object is an array containing at least 1 item
     * @param {ArrayLike} list
     * @param {boolean} canBeEmpty
     * @returns {any}
     */
    linqCore.prototype.ensureItems = function (list, canBeEmpty) {

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

    /**
     * Determines if the specified object is an array
     * @param {any} obj the object to test
     * @returns {boolean}
     */
    linqCore.prototype.isArray = function (obj) {

        //if (obj == null) {
        //    throw new Error("obj must not be null");
        //}

        if (Object.prototype.toString.call(obj) !== '[object Array]') {
            return false;
        }

        return true;
    };

    /// where
    linqCore.prototype.where = function (items, lambda) {

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
    linqCore.prototype.any = function (items, lambda) {

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
    linqCore.prototype.first = function (items, lambda) {

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

    /**
     * firstOrDefault
     * @param {ArrayLike} items
     * @param {predicateFunc=} predicate
     * @param {any=} defaultValue
     * @returns
     */
    linqCore.prototype.firstOrDefault = function (items, predicate, defaultValue) {

        this.ensureLambdaIfNotNull(predicate);

        if (predicate == null) {

            this.ensureItems(items, true);

            return items.length === 0 ? defaultValue : items[0];
        }

        var item;
        var idx;

        for (idx = 0; idx < items.length; idx += 1) {
            item = items[idx];

            if (predicate(item)) {
                return item;
            }
        }

        return defaultValue;
    };

    /// last
    linqCore.prototype.last = function (items, lambda) {

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
    linqCore.prototype.all = function (items, lambda) {

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

    /** Performs an operation on each item in an array, or each property in an object
    @param {ArrayLike|object} itemsOrObject The array to iterate over, or an object whose properties (methods are ignored) to iterate over.
    @param {function} lambda The function to run against each array item, or object property. To break out of forEch, return false from this lambda. Should be function(indexInArray, valueOfElement) { .... }
    */
    linqCore.prototype.forEach = function (itemsOrObject, lambda) {

        this.ensureLambda(lambda);

        if (this.isArray(itemsOrObject)) {

            this.ensureItems(itemsOrObject, true);

            var indexInArray;
            var valueOfElement;

            for (indexInArray = 0; indexInArray < itemsOrObject.length; indexInArray += 1) {
                valueOfElement = itemsOrObject[indexInArray];

                if (lambda(indexInArray, valueOfElement) === false) {
                    break;
                }
            }
        }
        else {
            if (itemsOrObject == null) {
                throw new Error("itemsOrObject must be an array or an object instance")
            }

            for (const property in itemsOrObject) {

                if (lambda(property, itemsOrObject[property]) === false) {
                    break;
                }
            }
        }
    };

    /// aggregate
    linqCore.prototype.aggregate = function (items, lambda) {

        this.ensureLambda(lambda);
        this.ensureItems(items);
        var result = null;

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = lambda(result, valueOfElement);
        });

        return result;
    };

    /// aggregateWithSeed
    linqCore.prototype.aggregateWithSeed = function (items, lambda, seed) {

        this.ensureLambda(lambda);
        this.ensureItems(items);

        var result = seed;

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = lambda(result, valueOfElement);
        });

        return result;
    };

    /// aggregateWithSeedAndResultSelector
    linqCore.prototype.aggregateWithSeedAndResultSelector = function (items, lambda, seed, resultSelector) {

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
    linqCore.prototype.average = function (items) {

        var total = 0;

        this.forEach(items, function (indexInArray, valueOfElement) {

            total += valueOfElement;
        });

        var avg = total / items.length;

        return avg;
    };

    /// averageWithTransform
    linqCore.prototype.averageWithTransform = function (items, transformerLambda) {

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
    linqCore.prototype.select = function (items, lambda) {

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
    linqCore.prototype.concat = function (firstItems, secondItems) {

        var results = [];

        results.push.apply(results, firstItems);

        results.push.apply(results, secondItems);

        return results;
    };

    /// contains
    linqCore.prototype.contains = function (items, value, comparerLambda) {

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
    linqCore.prototype.count = function (items) {

        this.ensureItems(items, true);

        return items.length;
    };

    /// defaultIfEmpty
    linqCore.prototype.defaultIfEmpty = function (items, defaultValue) {

        if (items != null && items.length > 0) {
            return items;
        }

        return [defaultValue];
    };

    /// distinct
    linqCore.prototype.distinct = function (items, comparerLambda) {

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
    linqCore.prototype.elementAt = function (items, index) {

        if (items.length > index) {
            return items[index];
        }

        return null;
    };

    /// except
    linqCore.prototype.except = function (firstItems, secondItems, comparerLambda) {

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
    linqCore.prototype.intersect = function (firstItems, secondItems, comparerLambda) {

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
    linqCore.prototype.max = function (items, comparerLambda) {

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
    linqCore.prototype.min = function (items, comparerLambda) {

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
    linqCore.prototype.orderBy = function (items, keySelectorLambda, comparerLambda) {

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
    linqCore.prototype.orderByDescending = function (items, keySelectorLambda, comparerLambda) {

        return this.orderBy(items, keySelectorLambda, comparerLambda).reverse();
    };

    /// sum

    /** sum Calculates the sum total of the items
    * @param {ArrayLike} items The array to sum up.
    * @param {function(any, number):number} [valueSelectorLambda] Optional function that transforms, or selects a property of, the items before summing them.
    * @returns {number} Returns a number representing the sum total.
    */
    linqCore.prototype.sum = function (items, valueSelectorLambda) {

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
    linqCore.prototype.single = function (items, lambda) {

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

    /**
     * singleOrDefault
     * @param {ArrayLike} items
     * @param {predicateFunc} lambda
     * @param {any} defaultValue
     * @returns {any}
     */
    linqCore.prototype.singleOrDefault = function (items, lambda, defaultValue) {

        this.ensureItems(items, true);

        //if (defaultValue === undefined) {
        //    throw new Error("defaultValue must be provided");
        //}

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
    linqCore.prototype.reverse = function (items) {

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
    linqCore.prototype.selectMany = function (items, collectionSelectorLambda, transformLambda) {

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
    linqCore.prototype.zip = function (items1, items2, lambda) {

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
    linqCore.prototype.union = function (firstItems, secondItems, comparerLambda) {

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
    linqCore.prototype.groupBy = function (items, keySelectorLambda) {

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
    linqCore.prototype.take = function (items, count) {

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
    linqCore.prototype.takeWhile = function (items, predicate) {

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
    linqCore.prototype.skip = function (items, count) {

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
    linqCore.prototype.skipWhile = function (items, predicate) {

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
    linqCore.prototype.setValue = function (arr, value, indices) {

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

    // join
    linqCore.prototype.join = function (items) {
        throw 'todo';
    };

    /**
     * IEnumerable<TResult>
     * @param {ArrayLike} outer Outer array
     * @param {ArrayLike} inner Inner array
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
    return linqCore;

})();

module.exports = linqJs.linqCore;