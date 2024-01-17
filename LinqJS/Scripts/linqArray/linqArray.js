/**
 * An array with Linq functions.
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
    };

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
    concat (additionalItems) {
        
        let result = new linqArray(this);

        result.push(...additionalItems);

        return result;
    };    

}

module.exports = linqArray;
