/// <reference path="~/Scripts/Utilities/Namespace.js" />

Namespace.Define("Netricity.LinqJS");

/// Enumerator 'class' - supports a simple iteration over an array.
Netricity.LinqJS.Enumerator = function (items) {
	var currentIdx = 0;
	var self = this;
	this.Current = null;

	this.MoveNext = function () {
		if (items.length > currentIdx) {
			self.Current = items[currentIdx];
			currentIdx++;
			return true;
		}

		return false;
	}

	this.reset = function () {
		currentIdx = 0;
		this.Current = null;
	}
};
