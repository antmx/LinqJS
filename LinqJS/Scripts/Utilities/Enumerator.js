/*jslint
    this: true, for: true, white: true
*/

"use strict";


/**
 * Utilities namespace
 */
var Utilities = Utilities || {};

/**
 * Enumerator 'class' - supports a simple iteration over an array.
 */
Utilities.Enumerator = (function () {

    /** 
     * Initialises a new Enumerator instance
     * @constructor
     */
    function Enumerator(items) {
        _items = items;
    }

    var _items = null;
    Enumerator.prototype.Current = null;
    Enumerator.prototype.CurrentIdx = -1;

    Enumerator.prototype.moveNext = function () {
        
        if (_items.length > this.CurrentIdx + 1) {
            this.CurrentIdx += 1;
            this.Current = _items[this.CurrentIdx];
            return true;
        }

        return false;
    };

    Enumerator.prototype.reset = function () {

        this.CurrentIdx = -1;
        this.Current = null;
    };

    // Return the instantiated 'class'
    return Enumerator;

})();
