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
if (obj == null) {
throw new Error("obj must not be null");
}
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
/** forEach Performs an operation on each item in the array.
@param {ArrayLike} items The array to iterate over.
@param {function} lambda The function to run against each item.
*/
linqCore.prototype.forEach = function (items, lambda) {
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
linqCore.prototype.each = function (items, lambda) {
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
linqCore.prototype.join = function (items) {
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
//extend(list, { getEnumerator: function () { return new Utilities.Enumerator(this); } });
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
/*jslint
this: true, for: true, white: true
*/
"use strict";
/// <reference path="linqify.js" />
/**
* jQuery plug-in. Enables jQuery to make an array Linq-able.
* @param {JQueryStatic} $ A jQuery-like object.
* @example <caption>Example usage of $.linqify.</caption>
* // returns [2, 4]
* var numbers = [1, 2, 3, 4];
* $().linqify(numbers).where(n => return n % 2 === 0)
*/
(function ($) {
/**
*  linqify Adds Linq methods to a standard JavaScript array.
*  @param {array} list The array to add Linq methods to.
*  @returns {[]} Returns a Linq-able array.
*/
$.fn.linqify = function (list) {
return linqify(list);
};
}(jQuery));
