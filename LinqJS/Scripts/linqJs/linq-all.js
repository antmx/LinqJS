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
/*jslint
this: true, for: true, white: true
*/
"use strict";
/// <reference path="./linq-core.js" />
const linqCoreModule = require('./linq-core');
/**
* Adds LINQ methods to an array.
* @template T The type of the items in @list.
* @param {Array<T>} list The array to add the LINQ methods to.
* @returns {Array<T>} Returns an array with LINQ methods added.
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
}
/**
* Removes LINQ functions from a previously linqified array.
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
* Give all arrays the ability to be self-LINQ-able, i.e. so we can do ```var someArray = [1, 2, 3]; someArray.linqify();```
* @returns {LinqableArray} Returns an array with LINQ functions attached.
*/
Array.prototype.linqify = function () {
linqify(this);
return this;
};
/** Gives all arrays the ability to remove LINQ functions from themselves, i.e. so we can do ```var someArray = [1, 2, 3]; someArray.linqify(); someArray.deLinqify();```
* @returns {[]} Returns an array with no LINQ functions attached to it.
*/
Array.prototype.deLinqify = function () {
deLinqify(this);
return this;
};
module.exports.linqify = linqify
module.exports.deLinqify = deLinqify
/*jslint
this: true, for: true, white: true
*/
"use strict";
/// <reference path="linqify.js" />
/**
* jQuery plug-in. Enables jQuery to add LINQ methods to a standard JavaScript array.
* @param {JQueryStatic} $ A jQuery-like object.
* @example <caption>Example usage of $.linqify.</caption>
* // returns [2, 4]
* var numbers = [1, 2, 3, 4];
* $().linqify(numbers).where(n => return n % 2 === 0);
*/
(function ($) {
/**
*  linqify Adds LINQ methods to a standard JavaScript array.
*  @param {array} list The array to add LINQ methods to.
*  @returns {[]} Returns an array with LINQ methods added to it.
*/
$.fn.linqify = function (list) {
return linqify(list);
};
}(jQuery));
