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
