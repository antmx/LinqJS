﻿/*jslint
    this: true, for: true, white: true
*/

"use strict";

var Utilities = Utilities || {};

/// Enumerator 'class' - supports a simple iteration over an array.
Utilities.Enumerator = function (items) {

    var self = this;
    this.Current = null;
    this.CurrentIdx = -1;

    this.MoveNext = function () {

        if (items.length > self.CurrentIdx + 1) {
            self.CurrentIdx += 1;
            self.Current = items[self.CurrentIdx];
            return true;
        }

        return false;
    };

    this.reset = function () {

        this.CurrentIdx = -1;
        this.Current = null;
    };
};
