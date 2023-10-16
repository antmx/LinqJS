/// <reference path="../_references.js" />

describe("linqCore takeWhile", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = ["apple", "banana", "mango", "orange", "passionfruit", "grape"];
	});

	it("Returns elements from a list as long as a specified condition is true.", function () {

		var result = _linqCore.takeWhile(_items, function (o) { return o != "orange" });
		var expected = ["apple", "banana", "mango"];

		expect(result).toEqual(expected);
	});

	it("Returns elements from a list as long as a specified condition is true, passing the each item's index to the predicate function.", function () {

		var result = _linqCore.takeWhile(_items, function (o, i) { return i < 4; });
		var expected = ["apple", "banana", "mango", "orange"];

		expect(result).toEqual(expected);
	});

});
