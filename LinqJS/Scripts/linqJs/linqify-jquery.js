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
