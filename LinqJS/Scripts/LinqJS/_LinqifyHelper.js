/*jslint
    this: true, for: true, white: true
*/

"use strict";

LinqJS = LinqJS || {};

LinqJS._LinqifyHelper = (function () {

    /**
     
     */
    function _LinqifyHelper() {

        this.Helper = new LinqJS.LinqHelper();
    }

    _LinqifyHelper.prototype.helloWorld = function () {

        return this.Helper.helloWorld();
    };

    _LinqifyHelper.prototype.where = function (lambda) {

        return this.Helper.where(this, lambda);
    };

    _LinqifyHelper.prototype.any = function (lambda) {

        return this.Helper.any(this, lambda);
    };

    _LinqifyHelper.prototype.first = function (lambda) {

        return this.Helper.first(this, lambda);
    };

    _LinqifyHelper.prototype.last = function (lambda) {

        return this.Helper.last(this, lambda);
    };

    _LinqifyHelper.prototype.all = function (lambda) {

        return this.Helper.all(this, lambda);
    };

    _LinqifyHelper.prototype.forEach = function (lambda) {

        return this.Helper.forEach(this, lambda);
    };

    ///// Returns an enumerator that iterates over the array.
    //_LinqifyHelper.prototype.getEnumerator = function () {

    //    return this.Helper.getEnumerator(this);
    //};

    // Applies an accumulator function over an array.
    _LinqifyHelper.prototype.aggregate = function (lambda) {

        return this.Helper.aggregate(this, lambda);
    };

    _LinqifyHelper.prototype.aggregateWithSeed = function (lambda, seed) {

        return this.Helper.aggregateWithSeed(this, lambda, seed);
    };

    _LinqifyHelper.prototype.aggregateWithSeedAndResultSelector = function (lambda, seed, resultSelector) {

        return this.Helper.aggregateWithSeedAndResultSelector(this, lambda, seed, resultSelector);
    };

    _LinqifyHelper.prototype.average = function () {

        return this.Helper.average(this);
    };

    _LinqifyHelper.prototype.averageWithTransform = function (transformerLambda) {

        return this.Helper.averageWithTransform(this, transformerLambda);
    };

    _LinqifyHelper.prototype.select = function (lambda) {

        return this.Helper.select(this, lambda);
    };


    return _LinqifyHelper;
})();
