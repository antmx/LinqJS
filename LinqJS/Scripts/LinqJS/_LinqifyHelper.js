/// <reference path="~/Scripts/Utilities/Namespace.js" />

Namespace.Define("Netricity.LinqJS");

Netricity.LinqJS._LinqifyHelper = function () {

}

Netricity.LinqJS._LinqifyHelper.prototype.where = function (lambda) {
	return Netricity.LinqJS.Helper.where(this, lambda);
};

Netricity.LinqJS._LinqifyHelper.prototype.any = function (lambda) {
	return Netricity.LinqJS.Helper.any(this, lambda);
};

Netricity.LinqJS._LinqifyHelper.prototype.first = function (lambda) {
	return Netricity.LinqJS.Helper.first(this, lambda);
};

Netricity.LinqJS._LinqifyHelper.prototype.last = function (lambda) {
	return Netricity.LinqJS.Helper.last(this, lambda);
};

Netricity.LinqJS._LinqifyHelper.prototype.all = function (lambda) {
	return Netricity.LinqJS.Helper.all(this, lambda);
};

Netricity.LinqJS._LinqifyHelper.prototype.forEach = function (lamda) {
	return Netricity.LinqJS.Helper.forEach(this, lambda);
};

/// Returns an enumerator that iterates over the array.
Netricity.LinqJS._LinqifyHelper.prototype.getEnumerator = function () {
	return Netricity.LinqJS.Helper.getEnumerator(this);
};

// Applies an accumulator function over an array.
Netricity.LinqJS._LinqifyHelper.prototype.aggregate = function (lambda) {
	return Netricity.LinqJS.Helper.aggregate(this, lambda);
};

Netricity.LinqJS._LinqifyHelper.prototype.aggregateWithSeed = function (lambda, seed) {
	return Netricity.LinqJS.Helper.aggregateWithSeed(this, lambda, seed);
};

Netricity.LinqJS._LinqifyHelper.prototype.aggregateWithSeedAndResultSelector = function (lambda, seed, resultSelector) {
	return Netricity.LinqJS.Helper.aggregateWithSeedAndResultSelector(this, lambda, seed, resultSelector);
};

Netricity.LinqJS._LinqifyHelper.prototype.average = function () {
	return Netricity.LinqJS.Helper.average(this);
};

Netricity.LinqJS._LinqifyHelper.prototype.averageWithTransform = function (transformerLambda) {
	return Netricity.LinqJS.Helper.averageWithTransform(this, transformerLambda);
};

Netricity.LinqJS._LinqifyHelper.prototype.select = function (lambda) {
	return Netricity.LinqJS.Helper.select(this, lambda);
};
