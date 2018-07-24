/*jslint
    this: true, for: true, white: true
*/

"use strict";

/// <reference path="Linqify.js" />

/**
 * jQuery plug-in. Enables jQuery to make an array Linq-able.
 * @param {JQueryStatic} $ A jQuery-like object.
 * @example <caption>Example usage of $.linqify.</caption>
 * // returns [2, 4]
 * var numbers = [1, 2, 3, 4];
 * $().linqify(numbers).Where(n => return n % 2 === 0)
 */
(function ($) {

    /** linqify Adds Linq methods to an array.
    @param {array} list The array the add Linq methods to.
    */
    $.fn.linqify = function (list) {

        return Linqify(list);
    };

}(jQuery));
