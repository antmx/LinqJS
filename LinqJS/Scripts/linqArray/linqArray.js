/**
 * An array with LINQ-like functions.
 */
class linqArray extends Array {

    /**
     * @param {ArrayLike} [items] An optional array of items to add to the new linqArray instance
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
        return Object.prototype.toString.call(arr) === "[object Array]";
    }

    #isFunction(fn) {
        return Object.prototype.toString.call(fn) === "[object Function]";
    }

    #isNumber(num) {
        return Object.prototype.toString.call(num) === "[object Number]";
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
     * Adds the given sequence to the instance.
     * @param {ArrayLike} items List of items to add.
     */
    addItems(items) {
        items.forEach(item => this.push(item));
    }

    /**
     * Filters a sequence of values based on a predicate.
     * @param {Function} predicateFn A function to test each element for a condition.
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
     * @param {Function=} predicateFn An optional function to test each element for a condition.
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
    @param {Function} runFunc The function to run against each array item, or object property. To break out of forEachItem, return false from runFunc. Should be function(indexInArray, valueOfElement) { .... }
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
     * @param {Function} accumulatorFn An accumulator function to be invoked on each element.
     * @param {any?} seed The initial accumulator value.
     * @param {Function?} resultSelectorFn A function to transform the final accumulator value into the result value.
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
     * @param {Function} predicateFn a function to test each item for a condition
     * @returns {Boolean} true if every element of the array passes the test in the specified predicate, or if the array is empty; otherwise, false
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
     * Concatenates two sequences.
     * @param {[]=} additionalItems The sequence to concatenate to the first sequence.
     */
    concat(additionalItems) {

        let result = new linqArray(this);

        result.push(...additionalItems);

        return result;
    }

    /**
     * Determines whether a sequence contains a specified element.
     * @param {*} value The value to locate in the sequence.
     * @param {Function=} comparerFn An optional equality comparer function to compare values. If not specified, the default equality comparer is used.
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
     * @param {ArrayLike} secondItems An array whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
     * @param {Function=} comparerFn An optional function to compare values. If not specified, the default equality comparer is used.
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
     * Returns the first element of a sequence, or a default value if no element is found.
     * @param {Function=} predicateFn An optioanl function to test each element for a condition.
     * @param {*} defaultValue The default value to return if the sequence is empty.
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

    /**
     * Groups the elements of a sequence.
     * @param {Function} keySelectorFn A function to extract the key for each element.
     * @returns 
     */
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
     * Produces the set intersection of two sequences.
     * @param {ArrayLike} secondItems An array whose distinct elements that also appear in the first sequence will be returned.
     * @param {Function=} comparerFn An optional function to compare values. If not specified, the default equality comparer is used.
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
     * Returns the last element of a sequence.
     * @param {Function=} predicateFn Optional function to test each element for a condition.
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
     * Returns the maximum value in a sequence of values.
     * @param {Function=} comparerFn An optional function to compare values. If not specified, the default equality comparer is used.
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
     * Returns the minimum value in a sequence of values.
     * @param {Function=} comparerFn An optional function to compare values. If not specified, the default equality comparer is used.
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

    /**
     * Sorts the elements of a sequence in ascending order.
     * @param {Function=} keySelectorFn A function to extract a key from an element.
     * @param {Function=} comparerFn An function to compare keys.
     * @returns 
     */
    orderBy(keySelectorFn, comparerFn) {

        this.#ensureItems(this, true);

        let items = this.slice(); // Clone the array so .sort doesn't re-order the original

        this.#ensureFuncIfDefined(keySelectorFn);

        this.#ensureFuncIfDefined(comparerFn);

        if (keySelectorFn === undefined) {
            keySelectorFn = function (o) { return o; };
        }

        let comparefn;

        if (comparerFn === undefined) {
            comparefn = function (a, b) {

                if (keySelectorFn(a) < keySelectorFn(b)) {
                    return -1;
                }

                if (keySelectorFn(a) > keySelectorFn(b)) {
                    return 1;
                }

                return 0;

            };
        } else {
            comparefn = function (a, b) {
                a = keySelectorFn(a);
                b = keySelectorFn(b);

                return comparerFn(a, b);
            };
        }

        items.sort(comparefn);

        return new linqArray(items);
    }

    /**
     * Sorts the elements of a sequence in descending order.
     * @param {Function=} keySelectorFn A function to extract a key from an element.
     * @param {Function=} comparerFn An function to compare keys.
     * @returns 
     */
    orderByDescending(keySelectorFn, comparerFn) {

        return this.orderBy(keySelectorFn, comparerFn).reverse2();
    }

    /**
     * Inverts the order of the elements in a sequence.
     * @returns 
     */
    reverse2() {

        if (this.length === 0) {
            return this;
        }

        let copiedItems = this.slice(); // Clone the array so .reverse doesn't re-order the original

        return new linqArray(copiedItems.reverse());
    }

    /**
     * Projects each element of a sequence into a new form.
     * @param {Function} transformFn A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
     * @returns 
     */
    select(transformFn) {

        this.#ensureFunc(transformFn);
        let results = new linqArray();
        let item;

        this.forEachItem(function (indexInArray, valueOfElement) {

            item = transformFn(valueOfElement, indexInArray);
            results.push(item);
        });

        return results;
    }

    /**
     * Projects each element of a sequence to a new array and flattens the resulting sequences into one sequence.
     * @param {*} collectionSelectorFn A transform function to apply to each element of the input sequence.
     * @param {*} transformFn A transform function to apply to each element of the intermediate sequence.
     * @returns 
     */
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

    /**
     * Sets the value of the specified array index to the given value. Can be used on nested arrays, too.
     * @param {*} value 
     * @param {ArrayLike|Number} indices 
     */
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

    /**
     * Returns a single, specific element of a sequence.
     * @param {*} predicateFn A function to test an element for a condition.
     * @returns 
     */
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
     * Returns a single, specific element of a sequence, or a default value if that element is not found.
     * @param {Function=} predicateFn A function to test an element for a condition.
     * @param {any} defaultValue The default value to return if the sequence is empty.
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
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     * @param {Number} count The number of elements to skip before returning the remaining elements.
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
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements
     * @param {Function} predicateFn A function to test each element for a condition
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

    /**
     * Returns a specified number of contiguous elements from the start of the array, or a specified range of contiguous elements from the array
     * @param {Number|ArrayLike<Number>} countOrRange 
     * @returns 
     */
    take(countOrRange) {

        let self = this;
        let results = new linqArray();

        if (this.#isNumber(countOrRange)) {
            if (countOrRange <= 0) {
                return results;
            }
        }
        else if (this.#isArray(countOrRange)) {
            if (countOrRange.length !== 2) {
                throw new Error("range must contain exactly 2 numers");
            }
            else if (countOrRange[0] > countOrRange[1]) {
                throw new Error("countOrRange must be either a number or an array of 2 numbers");
            }
        }
        else {
            throw new Error("Start range must be greater than or equal to end range");
        }

        this.forEachItem(function (indexInArray, valueOfElement) {

            if (self.#isNumber(countOrRange)) {
                if (indexInArray < countOrRange) {
                    results.push(valueOfElement);
                }
                else {
                    return false; // Break out of forEachItem
                }
            }
            else {
                // Range
                if (indexInArray >= countOrRange[0] && indexInArray <= countOrRange[1]) {
                    results.push(valueOfElement);
                }
                else if (indexInArray > countOrRange[1]) {
                    return false; // Break out of forEachItem
                }
            }
        });

        return results;
    }

    /**
     * Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
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
     * Produces the set union of two sequences by using either the default equality comparer, or the specified equality comparer
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
     * @param {Function} fn The function to apply to the corresponding elements
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
