/*jslint
    this: true, for: true, white: true
*/

"use strict";

var LinqJS = LinqJS || {};

/**
*/
LinqJS.LinqHelper = (function () {

    /** LinqHelper
     * @constructor : Initialises a new LinqHelper instance
     * @prop {function} helloWorld Returns 'Hello, World!'.
     */
    function LinqHelper() {

    }

    LinqHelper.prototype.helloWorld = function () {

        return "Hello, World!";
    };

    //LinqHelper.prototype.getEnumerator = function (items) {

    //    if (items.enumerator == null) {
    //        items.enumerator = new Utilities.Enumerator(items);
    //    }
    //    else {
    //        items.enumerator.reset();
    //    }

    //    return items.enumerator;
    //};

    /// Checks the specified object is a function
    LinqHelper.prototype.ensureLambda = function (lambda) {

        if (typeof lambda !== "function") {
            throw new Error("lambda must be a function");
        }
    };

    /// Checks the specified object is a function, if it isn't null
    LinqHelper.prototype.ensureLambdaIfNotNull = function (lambda) {

        if (lambda != null) {
            this.ensureLambda(lambda);
        }
    };

    /// Checks the specified object is an array containing at least 1 item
    LinqHelper.prototype.ensureItems = function (list, canBeEmpty) {

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
    LinqHelper.prototype.isArray = function (obj) {

        if (obj == null) {
            throw new Error("obj must not be null");
        }

        if (Object.prototype.toString.call(obj) !== '[object Array]') {
            return false;
        }

        return true;
    };

    /// where
    LinqHelper.prototype.where = function (items, lambda) {

        this.ensureLambda(lambda);
        //var enumerator = this.getEnumerator(items);
        var results = [];

        //while (enumerator.MoveNext()) {
        //	if (lambda(enumerator.Current))
        //		results.push(enumerator.Current);
        //}

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (lambda(valueOfElement)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// any
    LinqHelper.prototype.any = function (items, lambda) {

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
    LinqHelper.prototype.first = function (items, lambda) {

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
    LinqHelper.prototype.firstOrDefault = function (items, lambda, defaultValue) {

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
    LinqHelper.prototype.last = function (items, lambda) {

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
    LinqHelper.prototype.all = function (items, lambda) {

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
    LinqHelper.prototype.forEach = function (items, lambda) {

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
    LinqHelper.prototype.aggregate = function (items, lambda) {

        this.ensureLambda(lambda);
        this.ensureItems(items);
        var result = null;

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = lambda(result, valueOfElement);
        });

        return result;
    };

    /// aggregateWithSeed
    LinqHelper.prototype.aggregateWithSeed = function (items, lambda, seed) {

        this.ensureLambda(lambda);
        this.ensureItems(items);

        var result = seed;
        //var e = this.getEnumerator(items);

        //while (e.MoveNext()) {
        //    result = lambda(result, e.Current);
        //}

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = lambda(result, valueOfElement);
        });

        return result;
    };

    /// aggregateWithSeedAndResultSelector
    LinqHelper.prototype.aggregateWithSeedAndResultSelector = function (items, lambda, seed, resultSelector) {

        this.ensureLambda(lambda);
        this.ensureLambda(resultSelector);

        var result = seed;
        //var e = this.getEnumerator(items);

        //while (e.MoveNext()) {
        //    result = lambda(result, e.Current);
        //}

        this.forEach(items, function (indexInArray, valueOfElement) {

            result = lambda(result, valueOfElement);
        });

        result = resultSelector(result);

        return result;
    };

    /// average
    LinqHelper.prototype.average = function (items) {

        //var enumerator = this.getEnumerator(items);
        var total = 0;

        //while (enumerator.MoveNext()) {
        //    total += enumerator.Current;
        //}

        this.forEach(items, function (indexInArray, valueOfElement) {

            total += valueOfElement;
        });

        var avg = total / items.length;

        return avg;
    };

    /// averageWithTransform
    LinqHelper.prototype.averageWithTransform = function (items, transformerLambda) {

        this.ensureLambda(transformerLambda);

        //var enumerator = this.getEnumerator(items);
        var total = 0;
        var value;

        //while (enumerator.MoveNext()) {
        //    value = transformerLambda(enumerator.Current);
        //    total += value;
        //}

        this.forEach(items, function (indexInArray, valueOfElement) {

            value = transformerLambda(valueOfElement);
            total += value;
        });

        var avg = total / items.length;

        return avg;
    };

    /// select
    LinqHelper.prototype.select = function (items, lambda) {

        this.ensureItems(items, true);
        var results = [];
        //var enumerator = this.getEnumerator(items);

        var item;

        //while (enumerator.MoveNext()) {
        //    item = lambda(enumerator.Current);
        //    results.push(item);
        //}

        this.forEach(items, function (indexInArray, valueOfElement) {

            item = lambda(valueOfElement);
            results.push(item);
        });

        return results;
    };

    /// concat
    LinqHelper.prototype.concat = function (firstItems, secondItems) {

        var results = [];

        //var e = this.getEnumerator(firstItems);

        //while (e.MoveNext()) {
        //    results.push(e.Current);
        //}

        //e = this.getEnumerator(secondItems);

        //while (e.MoveNext()) {
        //    results.push(e.Current);
        //}

        results.push.apply(results, firstItems);

        results.push.apply(results, secondItems);

        return results;
    };

    /// contains
    LinqHelper.prototype.contains = function (items, value, comparerLambda) {

        //var e = this.getEnumerator(items);

        if (typeof comparerLambda !== "function") {
            comparerLambda = function (first, second) {
                return first == second;
            };
        }

        //while (e.MoveNext()) {
        //    if (comparerLambda(e.Current, value)) {
        //        return true;
        //    }
        //}

        var result = false;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (comparerLambda(valueOfElement, value)) {
                result = true;
                return false; // break out of forEach
            }
        });

        //return false;
        return result;
    };

    /// count
    LinqHelper.prototype.count = function (items) {

        this.ensureItems(items, true);

        return items.length;
    };

    /// defaultIfEmpty
    LinqHelper.prototype.defaultIfEmpty = function (items, defaultValue) {

        if (items != null && items.length > 0) {
            return items;
        }

        return [defaultValue];
    };

    /// distinct
    LinqHelper.prototype.distinct = function (items, comparerLambda) {

        var self = this;
        var results = [];

        //var e = this.getEnumerator(items);

        //while (e.MoveNext()) {
        //    if (!this.contains(results, e.Current, comparerLambda)) {
        //        results.push(e.Current);
        //    }
        //}

        //delete results.enumerator;

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (!self.contains(results, valueOfElement, comparerLambda)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// elementAt
    LinqHelper.prototype.elementAt = function (items, index) {

        if (items.length > index) {
            return items[index];
        }

        return null;
    };

    /// except
    LinqHelper.prototype.except = function (firstItems, secondItems, comparerLambda) {

        var self = this;
        var results = [];

        firstItems = this.distinct(firstItems, comparerLambda);
        secondItems = this.distinct(secondItems, comparerLambda);

        //var e = this.getEnumerator(firstItems);

        //while (e.MoveNext()) {
        //    if (!this.contains(secondItems, e.Current, comparerLambda)) {
        //        results.push(e.Current);
        //    }
        //}

        //e = this.getEnumerator(secondItems);

        //while (e.MoveNext()) {
        //    if (!this.contains(firstItems, e.Current, comparerLambda)) {
        //        results.push(e.Current);
        //    }
        //}

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
    LinqHelper.prototype.intersect = function (firstItems, secondItems, comparerLambda) {

        var self = this;
        var results = [];

        firstItems = this.distinct(firstItems, comparerLambda);

        //var e = this.getEnumerator(firstItems);

        //while (e.MoveNext()) {
        //    if (this.contains(secondItems, e.Current, comparerLambda)) {
        //        results.push(e.Current);
        //    }
        //}

        this.forEach(firstItems, function (indexInArray, valueOfElement) {

            if (self.contains(secondItems, valueOfElement, comparerLambda)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// max
    LinqHelper.prototype.max = function (items, comparerLambda) {

        if (typeof comparerLambda !== "function") {
            comparerLambda = function (first, second) {
                return first > second;
            };
        }

        var result;

        //var e = this.getEnumerator(items);

        //while (e.MoveNext()) {
        //    if (!result || comparerLambda(e.Current, result)) {
        //        result = e.Current;
        //    }
        //}

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (!result || comparerLambda(valueOfElement, result)) {
                result = valueOfElement;
            }
        });

        return result;
    };

    /// min
    LinqHelper.prototype.min = function (items, comparerLambda) {

        if (typeof comparerLambda !== "function") {
            comparerLambda = function (first, second) {
                return first < second;
            };
        }

        var result;

        //var e = this.getEnumerator(items);

        //while (e.MoveNext()) {
        //    if (result == null || comparerLambda(e.Current, result)) {
        //        result = e.Current;
        //    }
        //}

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (!result || comparerLambda(valueOfElement, result)) {
                result = valueOfElement;
            }
        });

        return result;
    };

    /// orderBy
    LinqHelper.prototype.orderBy = function (items, keySelectorLambda, comparerLambda) {

        this.ensureItems(items);

        items = items.slice(); // Clone the array so .sort doesn't re-order the original

        this.ensureLambdaIfNotNull(keySelectorLambda);

        this.ensureLambdaIfNotNull(comparerLambda);

        if (keySelectorLambda == null) {
            keySelectorLambda = function (o) { return o; };
        }

        var comparefn;

        if (comparerLambda == null) {
            comparefn = function (a, b) { return keySelectorLambda(a) - keySelectorLambda(b); };
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
    LinqHelper.prototype.orderByDescending = function (items, keySelectorLambda, comparerLambda) {

        return this.orderBy(items, keySelectorLambda, comparerLambda).reverse();
    };

    /// sum

    /** sum Calculates the sum total of the items
    * @param {array} items The array to sum up.
    * @param {function} [valueSelectorLambda] Optional function that transforms, or selects a property of, the items before summing them.
    * @returns {number} Returns a number representing the sum total.
    */
    LinqHelper.prototype.sum = function (items, valueSelectorLambda) {

        this.ensureItems(items, true);

        if (valueSelectorLambda == null) {
            valueSelectorLambda = function (o) { return o; };
        }

        var total = 0;

        this.forEach(items, function (indexInArray, valueOfElement) {

            total += valueSelectorLambda(valueOfElement);
        });

        return total;
    };

    /// single
    LinqHelper.prototype.single = function (items, lambda) {

        this.ensureItems(items);

        var count = 0;

        if (typeof lambda !== "function") {
            lambda = function () {
                return true;
            };
        }

        var result;
        //var e = this.getEnumerator(items);

        //while (e.MoveNext()) {
        //    if (lambda(e.Current)) {
        //        result = e.Current;
        //        count += 1;
        //    }
        //}

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
    LinqHelper.prototype.singleOrDefault = function (items, lambda, defaultValue) {

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
        //var e = this.getEnumerator(items);

        //while (e.MoveNext()) {
        //    if (lambda(e.Current)) {
        //        result = e.Current;
        //        count += 1;
        //    }
        //}
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
    LinqHelper.prototype.reverse = function (items) {

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
    LinqHelper.prototype.selectMany = function (items, collectionSelectorLambda, transformLambda) {

        var self = this;
        this.ensureItems(items, true);
        this.ensureLambda(collectionSelectorLambda);
        this.ensureLambdaIfNotNull(transformLambda);

        if (items.length === 0) {
            return items;
        }

        var result = [];
        //var e = this.getEnumerator(items);

        var subElements;
        //var eSub;
        var o;

        //while (e.MoveNext()) {
        //    subElements = collectionSelectorLambda(e.Current);
        //    eSub = this.getEnumerator(subElements);

        //    while (eSub.MoveNext()) {
        //        if (transformLambda) {
        //            o = transformLambda(eSub.Current, e.CurrentIdx);
        //            result.push(o);
        //        } else {
        //            result.push(eSub.Current);
        //        }
        //    }
        //}

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
    LinqHelper.prototype.zip = function (items1, items2, lambda) {

        this.ensureItems(items1);
        this.ensureItems(items2);
        this.ensureLambda(lambda);

        var result = [];
        //var e1 = this.getEnumerator(items1);
        //var e2 = this.getEnumerator(items2);
        var item;

        //while (e1.MoveNext() && e2.MoveNext()) {
        //    item = lambda(e1.Current, e2.Current);
        //    result.push(item);
        //}

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
    LinqHelper.prototype.union = function (firstItems, secondItems, comparerLambda) {

        var self = this;
        var results = [];

        firstItems = this.distinct(firstItems, comparerLambda);
        secondItems = this.distinct(secondItems, comparerLambda);

        //var e = this.getEnumerator(firstItems);

        //while (e.MoveNext()) {
        //    if (!this.contains(results, e.Current, comparerLambda)) {
        //        results.push(e.Current);
        //    }
        //}

        //e = this.getEnumerator(secondItems);

        //while (e.MoveNext()) {
        //    if (!this.contains(results, e.Current, comparerLambda)) {
        //        results.push(e.Current);
        //    }
        //}

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
    LinqHelper.prototype.groupBy = function (items, keySelectorLambda) {

        var self = this;
        this.ensureLambda(keySelectorLambda);
        var results = [];

        if (items == null || items.length === 0) {
            return results;
        }

        //var e = this.getEnumerator(items);
        var currentKey;
        var item;
        var firstOrDefaultLambda = function (o) { return o.Key == currentKey; };

        //while (e.MoveNext()) {
        //    currentKey = keySelectorLambda(e.Current);

        //    item = this.firstOrDefault(
        //        results,
        //        firstOrDefaultLambda,
        //        { Key: currentKey, Count: 0 });

        //    if (item.Count === 0) {
        //        results.push(item);
        //    }

        //    item.Count += 1;
        //}

        this.forEach(items, function (indexInArray, valueOfElement) {

            currentKey = keySelectorLambda(valueOfElement);

            item = self.firstOrDefault(
                results,
                firstOrDefaultLambda,
                { Key: currentKey, Count: 0 });

            if (item.Count === 0) {
                results.push(item);
            }

            item.Count += 1;
        });

        return results;
    };

    /// take
    LinqHelper.prototype.take = function (items, count) {

        this.ensureItems(items, true);

        var results = [];

        if (count <= 0) {
            return results;
        }

        //var e = this.getEnumerator(items);

        //while (e.MoveNext() && e.CurrentIdx < count) {
        //    results.push(e.Current);
        //}

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
    LinqHelper.prototype.takeWhile = function (items, predicate) {

        this.ensureItems(items, true);

        var results = [];

        //var e = this.getEnumerator(items);

        //while (e.MoveNext()) {
        //    if (predicate(e.Current, e.CurrentIdx)) {
        //        results.push(e.Current);
        //    } else {
        //        break;
        //    }
        //}

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
    LinqHelper.prototype.skip = function (items, count) {

        this.ensureItems(items, true);

        var results = [];

        if (count <= 0) {
            return results;
        }

        //var e = this.getEnumerator(items);

        //while (count > 0 && e.MoveNext()) {
        //    count -= 1;
        //}

        //if (count <= 0) {
        //    while (e.MoveNext()) {
        //        results.push(e.Current);
        //    }
        //}

        this.forEach(items, function (indexInArray, valueOfElement) {

            if (indexInArray + 1 > count) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /// skipWhile
    LinqHelper.prototype.skipWhile = function (items, predicate) {

        this.ensureItems(items, true);

        var results = [];

        //var e = this.getEnumerator(items);

        //var yielding = false;

        //while (e.MoveNext()) {
        //    if (!yielding && !predicate(e.Current, e.CurrentIdx)) {
        //        yielding = true;
        //    }

        //    if (yielding) {
        //        results.push(e.Current);
        //    }
        //}

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
    LinqHelper.prototype.setValue = function (arr, value, indices) {

        this.ensureItems(arr, true);

        if (typeof indices === "number") {
            indices = [indices];
        }

        this.ensureItems(indices, false);

        //var e = this.getEnumerator(indices);
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
    LinqHelper.prototype.each = function (items, lambda) {

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


    // Return the constructor
    return LinqHelper;

})();



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

/// <reference path="Namespace.js" />

// Copied from angular.js - use this to add extra properties/functions to an INSTANCE of a type

var Utilities = Utilities || {};

Utilities.extend = function (dst) {

    var h = dst.$$hashKey;

    forEach(arguments, function (obj) {

        if (obj !== dst) {
            forEach(obj, function (value, key) {
                dst[key] = value;
            });
        }
    });

    setHashKey(dst, h);
    return dst;

    function forEach(obj, iterator, context) {

        var key;

        if (obj) {
            if (isFunction(obj)) {
                for (key in obj) {
                    if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            } else if (obj.forEach && obj.forEach !== forEach) {
                obj.forEach(iterator, context);
            } else if (isArrayLike(obj)) {
                for (key = 0; key < obj.length; key++)
                    iterator.call(context, obj[key], key);
            } else {
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

        return toString.apply(value) === '[object Array]';
    }

    function setHashKey(obj, h) {

        if (h) {
            obj.$$hashKey = h;
        }
        else {
            delete obj.$$hashKey;
        }
    }
};



/** jQuery plug-in
*/
(function ($) {

    /** linqify Adds Linq methods to an array.
    @param {array} list The array the add Linq methods to.
    */
    $.fn.linqify = function (list) {

        return Linqify(list);
    };

}(jQuery));
