/// <reference path="Namespace.js" />

Namespace.Define("Netricity.Utilities");

/// Enumerator 'class' - supports a simple iteration over an array.
Netricity.Utilities.Enumerator = function (items) {
	var self = this;
	this.Current = null;
	this.CurrentIdx = -1;

	this.MoveNext = function () {

		if (items.length > self.CurrentIdx + 1) {
			self.CurrentIdx++;
			self.Current = items[self.CurrentIdx];
			return true;
		}

		return false;
	}

	this.reset = function () {
		this.CurrentIdx = -1;
		this.Current = null;
	}
};
