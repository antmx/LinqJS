/// <reference path="../_references.js" />

describe("linqCore union", function () {

	var _linqCore;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
	});

	it("Produces the set union of two lists, i.e. a list that contains the elements from both lists, excluding duplicates.", function () {

		var firstItems = [1, 1, 2, 3, 4, 5, 5, 5];
		var secondItems = [1, 3, 5, 7, 9, 5, 5, 5, 11, 11, 11, 11, 11];
		var result = _linqCore.union(firstItems, secondItems);
		var expected = [1, 2, 3, 4, 5, 7, 9, 11];

		expect(result).toEqual(expected);
	});

	it("Produces the set union of two lists, i.e. a list that contains the elements from both lists, excluding duplicates, using the specified equality comparer function.", function () {

		var firstItems = ["One", "one", "Two", "Three", "Four", "Five", "five", "five"];
		var secondItems = ["one", "three", "five", "Seven", "Nine", "five", "Five", "five", "Eleven", "eleven", "eleven", "eleven"];
		var comparerLambda = function (first, second) { return first.toLowerCase() == second.toLowerCase(); };
		var result = _linqCore.union(firstItems, secondItems, comparerLambda);
		var expected = ["One", "Two", "Three", "Four", "Five", "Seven", "Nine", "Eleven"];

		expect(result).toEqual(expected);
	});

});