
/**
 * @typedef {object} Linqable Represents an array with linqJs functions attached.
 * @property {function(WherePredicate) : Linqable} Where Finds items matching the given filter.
 * @property {function(TransformCallback) : Linqable} Select Projects each item into a new form.
 * @property {number} length Number of items in the array.
 */

/**
 * Predicate function used to test each item for a match.
 * @callback WherePredicate
 * @param {any} item
 * @returns {bool}
 */

/**
 * Function used to transform each item.
 * @callback TransformCallback
 * @param {any} item
 * @returns {object}
 */

/**
* Predicate function
* @name predicateFunc
* @function
* @param {any} item Each item in the array that will be passed into this function
* @returns {bool}
*/

/**
 * Performs a generic operation.
 * @template T
 * @param {object} item A generic parameter that flows through to the return type
 * @return {T} Returns a T.
 */
function MyFunction(item) {

    return null;
}
