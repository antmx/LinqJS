/// <reference path="../_references.js" />

describe("linqCore skipWhile", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = ["apple", "banana", "mango", "orange", "passionfruit", "grape"];
	});

	it("Bypasses elements in a list as long as a specified condition is true and then returns the remaining elements.", function () {

        var result = _linqCore.skipWhile(_items, function (o) { return o != "orange"; });
		var expected = ["orange", "passionfruit", "grape"];

		expect(result).toEqual(expected);
	});

	it("Bypasses elements in a list as long as a specified condition is true and then returns the remaining elements, passing each element's index to the predicate function.", function () {

		var result = _linqCore.skipWhile(_items, function (o, i) { return i < 4; });
		var expected = ["passionfruit", "grape"];

		expect(result).toEqual(expected);
	});

});
