
/// <reference path="~/Scripts/Utilities/Extend.js" />

Object.prototype.Linqify = function () {

	if (typeof this.length === 'undefined')
		throw new Error('Linqify requires an array');

	if (this.___linqified)
		return this;

	this.___linqified = true;

	// Add extra methods to the instance
	Netricity.Utilities.extend(this, { Where: Netricity.LinqJS.Where });
	Netricity.Utilities.extend(this, { Any: Netricity.LinqJS.Any });

	return this;
};

Namespace.Create("Netricity.LinqJS");

Netricity.LinqJS.EnsureLambda = function (lambda) {
	if (typeof (lambda) !== "function")
		throw new Error("lambda must be a function");
};

Netricity.LinqJS.Where = function (lambda) {
	Netricity.LinqJS.EnsureLambda(lambda);

	var results = [];

	for (var idx = 0; idx < this.length; idx++) {
		var obj = this[idx];

		if (lambda(obj))
			results.push(obj);
	}

	return results;
};

Netricity.LinqJS.Any = function (lambda) {
	if (typeof (lambda) === "undefined")
		return this.length > 0;

	Netricity.LinqJS.EnsureLambda(lambda);

	for (var idx = 0; idx < this.length; idx++) {
		var obj = this[idx];

		if (lambda(obj))
			return true;
	}

	return false;
};
