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
                return false; // break out of forEach
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

        let results = new linqArray([]);

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

        let self = this;
        this.#ensureFunc(keySelectorFn);
        let groups = new linqArray([]);

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
    orderByDescending  ( keySelectorFunc, comparerPredicate) {

        return this.orderBy(keySelectorFunc, comparerPredicate).reverse();
    }

}

module.exports = linqArray;
