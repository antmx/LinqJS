/*jslint
    this: true, for: true, white: true
*/

"use strict";

var linqJs = linqJs || {};

/**
 * .Net LINQ-like functions for JavaScript arrays - by Anthony Chambers.
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
     * Checks the specified object is a function and throws an error if not
     * @param {any} possibleFunc the object to test for being a function
     */
    linqCore.prototype.ensureFunc = function (possibleFunc) {

        if (typeof possibleFunc !== "function") {
            throw new Error("possibleFunc must be a function");
        }
    };

    /**
     * Checks the specified object is a function. If it isn't null and isn't a function, throws an error
     * @param {Function} possibleFunc the object to test for being a function
     */
    linqCore.prototype.ensureFuncIfNotNull = function (possibleFunc) {

        if (possibleFunc != null) {
            this.ensureFunc(possibleFunc);
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

        if (Object.prototype.toString.call(obj) !== '[object Array]') {
            return false;
        }

        return true;
    };

    /// where
    linqCore.prototype.where = function (items, predicate) {

        this.ensureFunc(predicate);

        var results = [];

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (predicate(valueOfElement, indexInArray)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /**
     * Determines whether any elements of an array satisfy a condition
     * @param {ArrayLike} items an array that contains the elements to apply the predicate to
     * @param {function?} predicate optional function to test each element for a condition
     * @returns {boolean} true if any element of the array passes the test in the specified predicate; otherwise, false
     */
    linqCore.prototype.any = function (items, predicate) {

        if (predicate == null) {
            return items.length > 0;
        }

        this.ensureFunc(predicate);

        var item;
        var idx;

        for (idx = 0; idx < items.length; idx += 1) {
            item = items[idx];

            if (predicate(item)) {
                return true;
            }
        }

        return false;
    };

    /// first
    linqCore.prototype.first = function (items, predicate) {

        if (predicate == null) {

            this.ensureItems(items);

            return items[0];
        }

        this.ensureFunc(predicate);

        var item;
        var idx;

        for (idx = 0; idx < items.length; idx += 1) {
            item = items[idx];

            if (predicate(item)) {
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

        this.ensureFuncIfNotNull(predicate);

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
    linqCore.prototype.last = function (items, predicate) {

        if (predicate == null) {

            this.ensureItems(items);

            return items[items.length - 1];
        }

        this.ensureFunc(predicate);

        var item;
        var idx;

        for (idx = items.length - 1; idx >= 0; idx -= 1) {
            item = items[idx];

            if (predicate(item)) {
                return item;
            }
        }

        throw new Error("Array contains no matching items");
    };

    /**
     * Determines whether all elements of an array satisfy a condition
     * @param {ArrayLike} items an array that contains the elements to apply the predicate to
     * @param {function} predicate a function to test each item for a condition
     * @returns {boolean} true if every element of the array passes the test in the specified predicate, or if the array is empty; otherwise, false
     */
    linqCore.prototype.all = function (items, predicate) {

        this.ensureFunc(predicate);

        var item;
        var idx;

        for (idx = 0; idx < items.length; idx += 1) {
            item = items[idx];

            if (!predicate(item)) {
                return false;
            }
        }

        return true;
    };

    /** Performs an operation on each item in an array, or on each property in an object
    @param {ArrayLike|object} itemsOrObject The array to iterate over, or an object whose properties (methods are ignored) to iterate over.
    @param {function} runFunc The function to run against each array item, or object property. To break out of forEach, return false from this predicate. Should be function(indexInArray, valueOfElement) { .... }
    */
    linqCore.prototype.forEach = function (itemsOrObject, runFunc) {

        this.ensureFunc(runFunc);

        if (this.isArray(itemsOrObject)) {

            this.ensureItems(itemsOrObject, true);

            var indexInArray;
            var valueOfElement;

            for (indexInArray = 0; indexInArray < itemsOrObject.length; indexInArray += 1) {
                valueOfElement = itemsOrObject[indexInArray];

                if (runFunc(indexInArray, valueOfElement) === false) {
                    break;
                }
            }
        }
        else {
            if (itemsOrObject == null) {
                throw new Error("itemsOrObject must be an array or an object instance")
            }

            for (const memberName in itemsOrObject) {

                if (typeof itemsOrObject[memberName] === "function") {
                    // Ignore methods
                    continue;
                }

                if (runFunc(memberName, itemsOrObject[memberName]) === false) {
                    break;
                }
            }
        }
    };

    /// aggregate
    linqCore.prototype.aggregate = function (items, predicate) {

        this.ensureFunc(predicate);
        this.ensureItems(items);
        var result = null;

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = predicate(result, valueOfElement);
        });

        return result;
    };

    /// aggregateWithSeed
    linqCore.prototype.aggregateWithSeed = function (items, predicate, seed) {

        this.ensureFunc(predicate);
        this.ensureItems(items);

        var result = seed;

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = predicate(result, valueOfElement);
        });

        return result;
    };

    /// aggregateWithSeedAndResultSelector
    linqCore.prototype.aggregateWithSeedAndResultSelector = function (items, predicate, seed, resultSelector) {

        this.ensureFunc(predicate);
        this.ensureFunc(resultSelector);

        var result = seed;

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = predicate(result, valueOfElement);
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
    linqCore.prototype.averageWithTransform = function (items, transformerFunc) {

        this.ensureFunc(transformerFunc);

        var total = 0;
        var value;

        this.forEach(items, function (indexInArray, valueOfElement) {

            value = transformerFunc(valueOfElement);
            total += value;
        });

        var avg = total / items.length;

        return avg;
    };

    /// select
    linqCore.prototype.select = function (items, transformFunc) {

        this.ensureItems(items, true);

        var results = [];
        var item;

        this.forEach(items, function (indexInArray, valueOfElement) {

            item = transformFunc(valueOfElement, indexInArray);
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
    linqCore.prototype.contains = function (items, value, comparerPredicate) {

        if (typeof comparerPredicate !== "function") {
            comparerPredicate = function (first, second) {
                return first == second;
            };
        }

        var result = false;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (comparerPredicate(valueOfElement, value)) {
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
    linqCore.prototype.distinct = function (items, comparerPredicate) {

        var self = this;
        var results = [];

        self.forEach(items, function (indexInArray, valueOfElement) {

            if (!self.contains(results, valueOfElement, comparerPredicate)) {
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
    linqCore.prototype.except = function (firstItems, secondItems, comparerPredicate) {

        var self = this;
        var results = [];

        firstItems = this.distinct(firstItems, comparerPredicate);
        secondItems = this.distinct(secondItems, comparerPredicate);

        this.forEach(firstItems, function (indexInArray, valueOfElement) {

            if (!self.contains(secondItems, valueOfElement, comparerPredicate)) {
                results.push(valueOfElement);
            }
        });

        this.forEach(secondItems, function (indexInArray, valueOfElement) {

            if (!self.contains(firstItems, valueOfElement, comparerPredicate)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// intersect
    linqCore.prototype.intersect = function (firstItems, secondItems, comparerPredicate) {

        var self = this;
        var results = [];

        firstItems = this.distinct(firstItems, comparerPredicate);

        this.forEach(firstItems, function (indexInArray, valueOfElement) {

            if (self.contains(secondItems, valueOfElement, comparerPredicate)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// max
    linqCore.prototype.max = function (items, comparerPredicate) {

        if (typeof comparerPredicate !== "function") {
            comparerPredicate = function (first, second) {
                return first > second;
            };
        }

        var result;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (!result || comparerPredicate(valueOfElement, result)) {
                result = valueOfElement;
            }
        });

        return result;
    };

    /// min
    linqCore.prototype.min = function (items, comparerPredicate) {

        if (typeof comparerPredicate !== "function") {
            comparerPredicate = function (first, second) {
                return first < second;
            };
        }

        var result;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (!result || comparerPredicate(valueOfElement, result)) {
                result = valueOfElement;
            }
        });

        return result;
    };

    /// orderBy
    linqCore.prototype.orderBy = function (items, keySelectorFunc, comparerPredicate) {

        this.ensureItems(items, true);

        items = items.slice(); // Clone the array so .sort doesn't re-order the original

        this.ensureFuncIfNotNull(keySelectorFunc);

        this.ensureFuncIfNotNull(comparerPredicate);

        if (keySelectorFunc == null) {
            keySelectorFunc = function (o) { return o; };
        }

        var comparefn;

        if (comparerPredicate == null) {
            comparefn = function (a, b) {

                if (keySelectorFunc(a) < keySelectorFunc(b)) {
                    return -1;
                }

                if (keySelectorFunc(a) > keySelectorFunc(b)) {
                    return 1;
                }

                return 0;

            };
        } else {
            comparefn = function (a, b) {
                a = keySelectorFunc(a);
                b = keySelectorFunc(b);

                return comparerPredicate(a, b);
            };
        }

        items.sort(comparefn);

        return items;
    };

    /// orderByDescending
    linqCore.prototype.orderByDescending = function (items, keySelectorFunc, comparerPredicate) {

        return this.orderBy(items, keySelectorFunc, comparerPredicate).reverse();
    };

    /// sum

    /** sum Calculates the sum total of the items
    * @param {ArrayLike} items The array to sum up.
    * @param {function(any, number):number} [valueSelectorFunc] Optional function that transforms, or selects a property of, the items before summing them.
    * @returns {number} Returns a number representing the sum total.
    */
    linqCore.prototype.sum = function (items, valueSelectorFunc) {

        this.ensureItems(items, true);

        if (valueSelectorFunc == null) {

            valueSelectorFunc = function (o) {

                var parsed = parseFloat(o);

                return isNaN(parsed) ? 0 : parsed;
            };
        }

        var total = 0;

        this.forEach(items, function (indexInArray, valueOfElement) {

            total += valueSelectorFunc(valueOfElement, indexInArray);
        });

        return total;
    };

    /// single
    linqCore.prototype.single = function (items, predicate) {

        this.ensureItems(items);

        var count = 0;

        if (typeof predicate !== "function") {
            predicate = function () {
                return true;
            };
        }

        var result;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (predicate(valueOfElement)) {
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
     * @param {predicateFunc} predicate
     * @param {any} defaultValue
     * @returns {any}
     */
    linqCore.prototype.singleOrDefault = function (items, predicate, defaultValue) {

        this.ensureItems(items, true);

        //if (defaultValue === undefined) {
        //    throw new Error("defaultValue must be provided");
        //}

        var count = 0;

        if (typeof predicate !== "function") {
            predicate = function () {
                return true;
            };
        }

        var result;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (predicate(valueOfElement)) {
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
    linqCore.prototype.selectMany = function (items, collectionSelectorFunc, transformFunc) {

        var self = this;
        this.ensureItems(items, true);
        this.ensureFunc(collectionSelectorFunc);
        this.ensureFuncIfNotNull(transformFunc);

        if (items.length === 0) {
            return items;
        }

        var result = [];
        var subElements;
        var o;

        this.forEach(items, function (indexInArray, valueOfElement) {

            subElements = collectionSelectorFunc(valueOfElement);

            self.forEach(subElements, function (subIndexInArray, subValueOfElement) {

                if (transformFunc) {
                    o = transformFunc(subValueOfElement, indexInArray);
                    result.push(o);
                } else {
                    result.push(subValueOfElement);
                }
            });
        });

        return result;
    };

    /// zip
    linqCore.prototype.zip = function (items1, items2, predicate) {

        this.ensureItems(items1);
        this.ensureItems(items2);
        this.ensureFunc(predicate);

        var result = [];
        var item;

        this.forEach(items1, function (indexInArray, valueOfElement) {

            if (items2.length >= indexInArray + 1) {
                item = predicate(valueOfElement, items2[indexInArray]);
                result.push(item);
            }
            else {
                return false; // break out of forEach
            }
        });

        return result;
    };

    /// union
    linqCore.prototype.union = function (firstItems, secondItems, comparerPredicate) {

        var self = this;
        var results = [];

        firstItems = this.distinct(firstItems, comparerPredicate);
        secondItems = this.distinct(secondItems, comparerPredicate);
        results.push.apply(results, firstItems);

        this.forEach(secondItems, function (indexInArray, valueOfElement) {

            if (!self.contains(results, valueOfElement, comparerPredicate)) {
                results.push(valueOfElement);
            }
        });

        delete results.enumerator;

        return results;
    };

    /// groupBy
    linqCore.prototype.groupBy = function (items, keySelectorFunc) {

        var self = this;
        this.ensureFunc(keySelectorFunc);
        var groups = [];

        if (items == null || items.length === 0) {
            return groups;
        }

        var itemGroupKey;
        /** @type {{ Key: any, Items: [] }} */
        var group;
        var firstOrDefaultPredicate = function (o) { return o.Key == itemGroupKey; };

        self.forEach(items, function (indexInArray, valueOfElement) {

            // Get item's key
            itemGroupKey = keySelectorFunc(valueOfElement);

            // Look for the item's expected group
            group = self.firstOrDefault(
                groups,
                firstOrDefaultPredicate,
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
        throw Error('todo');
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