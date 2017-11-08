/*jslint
    this: true, for: true, white: true
*/

"use strict";

/// <reference path="Linqify.js" />

/** jQuery plug-in
*/
(function ($) {

    /** linqify Adds Linq methods to an array.
    @param {array} list The array the add Linq methods to.
    */
    $.fn.linqify = function (list) {

        return Linqify(list);
    };

}(jQuery));
