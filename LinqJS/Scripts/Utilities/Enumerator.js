/*jslint
    this: true, for: true, white: true
*/

"use strict";

var Utilities = Utilities || {};

///// Enumerator 'class' - supports a simple iteration over an array.
//Utilities.Enumerator = function (items) {

//    var _self = this;
//    this.Current = null;
//    this.CurrentIdx = -1;

//    this.MoveNext = function () {

//        if (items.length > _self.CurrentIdx + 1) {
//            _self.CurrentIdx += 1;
//            _self.Current = items[_self.CurrentIdx];
//            return true;
//        }

//        return false;
//    };

//    this.reset = function () {

//        this.CurrentIdx = -1;
//        this.Current = null;
//    };
//};

var Enumerator = (function () {

    /** 
     * Initialises a new Enumerator instance
     * @constructor
     */
    function Enumerator(items) {
        _items = items;
    }

    //var _self = this;
    var _items = null;
    //var _self = this;
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

    // Return the constructor
    return Enumerator;

}());
