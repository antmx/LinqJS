/**
 * An array with LINQ-like functions.
 */
class linqArray extends Array {

    /**
     * @param {[]} [items] An optional array of items to add to the new linqArray instance
     */
    constructor(items) {
        if (Object.prototype.toString.call(items) === '[object Array]') {
            super(...items);
        }
        else if (Object.prototype.toString.call(items) === '[object String]') {
            let stringArray = items.split("");
            super(...stringArray);
        }
        else {
            super();
        }
    }

    //#region Private methods

    #isArray(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }

    #isFunction(fn) {
        return Object.prototype.toString.call(fn) === '[object Function]';
    }

    #ensureFunc(possibleFunc) {

        if (!this.#isFunction(possibleFunc)) {
            throw new Error("possibleFunc must be a function");
        }
    }

    /**
     * Checks the specified object is an array containing at least 1 item
     * @param {ArrayLike} list
     * @param {boolean} canBeEmpty
     * @returns {any}
     */
    #ensureItems(list, canBeEmpty) {

        if (list == null) {
            throw new Error("Array must not be null");
        }

        if (!this.#isArray(list)) {
            throw new Error("list must be an array");
        }

        if (list.length === 0 && canBeEmpty !== true) {
            throw new Error("Array must contain at least one item");
        }

        return true;
    }

    /**
     * Checks the specified object is a function. If it isn't undefined and isn't a function, throws an error
     * @param {Function} possibleFunc the object to test for being a function
     */
    #ensureFuncIfDefined(possibleFunc) {

        if (possibleFunc !== undefined) {
            this.#ensureFunc(possibleFunc);
        }
    }

    //#endregion

    /**
     * 
     * @param {[]} items
     */
    addItems(items) {
        items.forEach(item => this.push(item));
    }

    /**
     * Filters a sequence of values based on a predicate.
     * @param {Function} predicateFn
     * @returns
     */
    where(predicateFn) {

        this.#ensureFunc(predicateFn);

        let result = new linqArray();

        this.forEach(item => {
            if (predicateFn(item)) {
                result.push(item);
            }
        });

        return result;
    }

    /**
     * Returns the first element of a sequence.
     * @param {Function=} predicateFn
     * @returns The first matching item
     */
    first(predicateFn) {

        if (predicateFn === undefined) {
            this.#ensureItems(this);
            return this[0];
        }

        this.#ensureFunc(predicateFn);

        for (let idx = 0, itm; idx < this.length; idx += 1) {
            itm = this[idx];

            if (predicateFn(itm)) {
                return itm;
            }
        }

        throw new Error("Array contains no matching items");
    }

    /**
     * Determines whether any elements of an array satisfy a condition
     * @param {Function=} predicateFn optional function to test each element for a condition
     * @returns {boolean} true if any element of the array passes the test in the specified predicate; otherwise, false
     */
    any(predicateFn) {

        if (predicateFn === undefined) {
            return this.length > 0;
        }

        this.#ensureFunc(predicateFn);

        for (let idx = 0, itm; idx < this.length; idx += 1) {
            itm = this[idx];

            if (predicateFn(itm)) {
                return true;
            }
        }

        return false;
    }

    /** Performs an operation on each item in the array
    @param {function} runFunc The function to run against each array item, or object property. To break out of forEachItem, return false from runFunc. Should be function(indexInArray, valueOfElement) { .... }
    */
    forEachItem(runFunc) {

        this.#ensureFunc(runFunc);

        this.#ensureItems(this, true);

        let valueOfElement;

        for (let indexInArray = 0; indexInArray < this.length; indexInArray += 1) {
            valueOfElement = this[indexInArray];

            if (runFunc(indexInArray, valueOfElement) === false) {
                break;
            }
        }
    }

    /**
     * Applies an accumulator function over a sequence.
     * @param {Function} accumulatorFn 
     * @param {any?} seed 
     * @param {Function?} resultSelectorFn 
     * @returns 
     */
    aggregate(accumulatorFn, seed, resultSelectorFn) {

        this.#ensureFunc(accumulatorFn);
        let result = seed !== undefined ? seed : null;

        this.forEach(function (valueOfElement, indexInArray) {

            result = accumulatorFn(result, valueOfElement);
        });

        if (resultSelectorFn !== undefined) {
            this.#ensureFunc(resultSelectorFn);
            result = resultSelectorFn(result);
        }

        return result;
    }

    /**
     * Determines whether all elements of an array satisfy a condition
     * @param {function} predicateFn a function to test each item for a condition
     * @returns {boolean} true if every element of the array passes the test in the specified predicate, or if the array is empty; otherwise, false
     */
    all(predicateFn) {

        this.#ensureFunc(predicateFn);

        for (let idx = 0, itm; idx < this.length; idx += 1) {
            itm = this[idx];

            if (!predicateFn(itm)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Determines the average value of all items in the array.
     * @param {Function=} transformerFn Optional function to transform each array item before calculating the average.
     * @returns 
     */
    average(transformerFn) {

        if (transformerFn !== undefined) {
            this.#ensureFunc(transformerFn);
        }

        let total = 0;

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (transformerFn !== undefined) {
                total += transformerFn(valueOfElement);
            }
            else {
                total += valueOfElement;
            }
        });

        let avg = total / this.length;

        return avg;
    }

    /**
     * 
     * @param {[]=} additionalItems 
     */
    concat(additionalItems) {

        let result = new linqArray(this);

        result.push(...additionalItems);

        return result;
    }

    /**
     * 
     * @param {*} value 
     * @param {Function=} comparerFn 
     * @returns 
     */
    contains(value, comparerFn) {

        if (comparerFn === undefined) {
            comparerFn = function (first, second) {
                return first == second;
            };
        }
        else {
            this.#ensureFunc(comparerFn);
        }

        let result = false;

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (comparerFn(valueOfElement, value)) {
                result = true;
                return false; // break out of forEachItem
            }
        });

        return result;
    }

    /**
     * Gets or sets the length of the array. This is a number one higher than the highest index in the array.
     * @param {Number=} len 
     * @returns 
     */
    count(len) {

        if (len !== undefined) {
            this.length = len;
        }

        return this.length;
    }

    /**
     * Checks if the array is empty. If not, the array is returned; otherwise, a new array containing the default value is returned.
     * @param {*} defaultValue 
     * @returns 
     */
    // defaultIfEmpty(defaultValue) {

    //     if (this.length > 0) {
    //         return this;
    //     }

    //     return new linqArray([defaultValue]);
    // }

    /**
     * Returns distinct elements from a sequence.
     * @param {Function=} comparerFn Optional function to compare values. If not specified, the default equality is used to compare values
     * @returns 
     */
    distinct(comparerFn) {

        if (comparerFn !== undefined) {
            this.#ensureFunc(comparerFn);
        }

        let results = new linqArray();

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (!results.contains(valueOfElement, comparerFn)) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * Gets the value of the element at the specified index. If the array is smaller than the specified index, null is returned.
     * @param {Number} index The index of the item whose value we want to return
     * @returns 
     */
    elementAt(index) {

        if (this.length > index) {
            return this[index];
        }

        return null;
    }

    /**
     * Produces the set difference of this array and another array
     * @param {[]} secondItems 
     * @param {Function=} comparerFn 
     * @returns 
     */
    except(secondItems, comparerFn) {

        let results = new linqArray();

        let firstItems = this.distinct(comparerFn);

        secondItems = new linqArray(secondItems);
        secondItems = secondItems.distinct(comparerFn);

        firstItems.forEachItem(function (indexInArray, valueOfElement) {

            if (!secondItems.contains(valueOfElement, comparerFn)) {
                results.push(valueOfElement);
            }
        });

        secondItems.forEachItem(function (indexInArray, valueOfElement) {

            if (!firstItems.contains(valueOfElement, comparerFn)) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * 
     * @param {Function=} predicateFn 
     * @param {*} defaultValue 
     * @returns 
     */
    firstOrDefault(predicateFn, defaultValue) {

        this.#ensureFuncIfDefined(predicateFn);

        if (predicateFn == null) {

            this.#ensureItems(this, true);

            return this.length === 0 ? defaultValue : this[0];
        }

        for (let idx = 0, itm; idx < this.length; idx += 1) {
            itm = this[idx];

            if (predicateFn(itm)) {
                return itm;
            }
        }

        return defaultValue;
    }

    groupBy(keySelectorFn) {

        this.#ensureFunc(keySelectorFn);
        let groups = new linqArray();

        if (this.length === 0) {
            return groups;
        }

        let itemGroupKey;
        /** @type {{ Key: any, Items: [] }} */
        let group;
        let firstOrDefaultPredicate = function (o) { return o.Key == itemGroupKey; };

        this.forEachItem(function (indexInArray, valueOfElement) {

            // Get item's key
            itemGroupKey = keySelectorFn(valueOfElement);

            // Look for the item's expected group
            group = groups.firstOrDefault(
                firstOrDefaultPredicate,
                { Key: itemGroupKey, Items: [] });

            if (group.Items.length === 0) {
                groups.push(group);
            }

            group.Items.push(valueOfElement);
        });

        return groups;
    }

    /**
     * 
     * @param {[]} secondItems 
     * @param {Function=} comparerFn 
     * @returns 
     */
    intersect(secondItems, comparerFn) {

        let results = [];

        let firstItems = this.distinct(comparerFn);
        secondItems = new linqArray(secondItems);

        firstItems.forEachItem(function (indexInArray, valueOfElement) {

            if (secondItems.contains(valueOfElement, comparerFn)) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * 
     * @param {Function=} predicateFn 
     * @returns 
     */
    last(predicateFn) {

        if (predicateFn === undefined) {

            this.#ensureItems(this);

            return this[this.length - 1];
        }

        this.#ensureFunc(predicateFn);

        for (let idx = this.length - 1, itm; idx >= 0; idx -= 1) {
            itm = this[idx];

            if (predicateFn(itm)) {
                return itm;
            }
        }

        throw new Error("Array contains no matching items");
    }

    /**
     * 
     * @param {Function=} comparerFn 
     * @returns 
     */
    max(comparerFn) {

        if (comparerFn === undefined) {
            comparerFn = function (first, second) {
                return first > second;
            };
        }
        else {
            this.#ensureFunc(comparerFn);
        }

        let result;

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (!result || comparerFn(valueOfElement, result)) {
                result = valueOfElement;
            }
        });

        return result;
    }

    /**
     * 
     * @param {Function=} comparerFn 
     * @returns 
     */
    min(comparerFn) {

        if (comparerFn === undefined) {
            comparerFn = function (first, second) {
                return first < second;
            };
        }
        else {
            this.#ensureFunc(comparerFn);
        }

        let result;

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (!result || comparerFn(valueOfElement, result)) {
                result = valueOfElement;
            }
        });

        return result;
    }

    /// orderBy
    orderBy(keySelectorFunc, comparerPredicate) {

        this.#ensureItems(this, true);

        let items = this.slice(); // Clone the array so .sort doesn't re-order the original

        this.#ensureFuncIfDefined(keySelectorFunc);

        this.#ensureFuncIfDefined(comparerPredicate);

        if (keySelectorFunc === undefined) {
            keySelectorFunc = function (o) { return o; };
        }

        let comparefn;

        if (comparerPredicate === undefined) {
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

        return new linqArray(items);
    }

    /// orderByDescending
    orderByDescending(keySelectorFunc, comparerPredicate) {

        return this.orderBy(keySelectorFunc, comparerPredicate).reverse2();
    }

    reverse2() {

        if (this.length === 0) {
            return this;
        }

        let copiedItems = this.slice(); // Clone the array so .reverse doesn't re-order the original

        return new linqArray(copiedItems.reverse());
    }

    select(transformFunc) {

        let results = new linqArray();
        let item;

        this.forEachItem(function (indexInArray, valueOfElement) {

            item = transformFunc(valueOfElement, indexInArray);
            results.push(item);
        });

        return results;
    }

    selectMany(collectionSelectorFn, transformFn) {

        let self = this;
        this.#ensureFunc(collectionSelectorFn);
        this.#ensureFuncIfDefined(transformFn);

        if (this.length === 0) {
            return this;
        }

        let result = new linqArray();
        let subElements;
        let tranformed;

        this.forEachItem(function (indexInArray, valueOfElement) {

            subElements = new linqArray(collectionSelectorFn(valueOfElement));

            subElements.forEachItem(function (subIndexInArray, subValueOfElement) {

                if (transformFn) {
                    tranformed = transformFn(subValueOfElement, indexInArray);
                    result.push(tranformed);
                } else {
                    result.push(subValueOfElement);
                }
            });
        });

        return result;
    }

    setValue(value, indices) {

        if (typeof indices === "number") {
            indices = [indices];
        }

        this.#ensureItems(indices, false);

        let currentDimensionArray = this;
        let currentIndicee = -1;

        for (let idx = 0; idx < indices.length; idx += 1) {

            currentIndicee = indices[idx];

            if (idx < indices.length - 1) {
                currentDimensionArray = currentDimensionArray[indices[idx]];
            }
        }

        currentDimensionArray[currentIndicee] = value;
    }

    single(predicateFn) {

        this.#ensureItems(this);

        let count = 0;

        if (predicateFn === undefined) {
            predicateFn = function () {
                return true;
            };
        }
        else {
            this.#ensureFunc(predicateFn);
        }

        let result;

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (predicateFn(valueOfElement)) {
                result = valueOfElement;
                count += 1;
            }
        });

        switch (count) {
            case 0: throw new Error("No match found");
            case 1: return result;
        }

        throw new Error("More than 1 match found");
    }

    /**
     * singleOrDefault
     * @param {predicateFunc} predicateFn
     * @param {any} defaultValue
     * @returns {any}
     */
    singleOrDefault(predicateFn, defaultValue) {

        let count = 0;

        if (predicateFn === undefined) {
            predicateFn = function () {
                return true;
            };
        }
        else {
            this.#ensureFunc(predicateFn);
        }

        let result;

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (predicateFn(valueOfElement)) {
                result = valueOfElement;
                count += 1;
            }
        });

        switch (count) {
            case 0: return defaultValue;
            case 1: return result;
        }

        throw new Error("More than 1 match found");
    }

    /**
     * 
     * @param {Number} count 
     * @returns 
     */
    skip(count) {

        let results = new linqArray();

        if (count <= 0) {
            return results;
        }

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (indexInArray + 1 > count) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * 
     * @param {*} predicateFn 
     * @returns 
     */
    skipWhile(predicateFn) {

        let results = new linqArray();
        let yielding = false;

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (!yielding && !predicateFn(valueOfElement, indexInArray)) {
                yielding = true;
            }

            if (yielding) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /** sum Calculates the sum total of the items
    * @param {Function(any, number):number} [valueSelectorFn] Optional function that transforms, or selects a property of, the items before summing them.
    * @returns {number} Returns a number representing the sum total.
    */
    sum(valueSelectorFn) {

        if (valueSelectorFn === undefined) {

            valueSelectorFn = function (o) {

                let parsed = parseFloat(o);

                return isNaN(parsed) ? 0 : parsed;
            };
        }
        else {
            this.#ensureFunc(valueSelectorFn)
        }

        let total = 0;

        this.forEachItem(function (indexInArray, valueOfElement) {

            total += valueSelectorFn(valueOfElement, indexInArray);
        });

        return total;
    }

    /// take
    take(count) {

        let results = new linqArray();

        if (count <= 0) {
            return results;
        }

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (indexInArray < count) {
                results.push(valueOfElement);
            }
            else {
                return false;
            }
        });

        return results;
    }

    /**
     * 
     * @param {Function} predicateFn e.g. (val, idx) => idx < 4
     * @returns 
     */
    takeWhile(predicateFn) {

        this.#ensureFunc(predicateFn);

        let results = new linqArray();

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (predicateFn(valueOfElement, indexInArray)) {
                results.push(valueOfElement);
            } else {
                return false; // break out of forEachItem
            }
        });

        return results;
    }

    /**
     * 
     * @param {ArrayLike} secondItems 
     * @param {Function=} comparerFn 
     * @returns 
     */
    union(secondItems, comparerFn) {

        let results = new linqArray();
        let firstItems = this.distinct(comparerFn);

        secondItems = new linqArray(secondItems);
        secondItems = secondItems.distinct(comparerFn);

        results.push(...firstItems);

        secondItems.forEachItem(function (indexInArray, valueOfElement) {

            if (!results.contains(valueOfElement, comparerFn)) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results
     * @param {ArrayLike} items2 
     * @param {Function} fn 
     * @returns 
     */
    zip(items2, fn) {

        this.#ensureItems(items2);
        this.#ensureFunc(fn);

        let result = new linqArray([]);
        let item;

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (items2.length >= indexInArray + 1) {
                item = fn(valueOfElement, items2[indexInArray]);
                result.push(item);
            }
            else {
                return false; // break out of forEachItem
            }
        });

        return result;
    }

}

module.exports = linqArray;
