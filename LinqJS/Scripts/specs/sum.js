/// <reference path="../_references.js" />

describe("linqCore sum", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = [
			{ name: "foo", age: 2, number: "two" },
			{ name: "bar", age: 4, number: "four" },
			{ name: "baz", age: 1, number: "one" },
			{ name: "qux", age: 3, number: "three" }];
	});

	it("Computes the sum of a list of values.", function () {

		var items = [1, 3, 2, 4, 5, 0];

		var result = _linqCore.sum(
			items);

		var expected = 15;

		expect(result).toEqual(expected);
	});

	it("Computes the sum of a list of values that are obtained by invoking a transform function on each element of a list.", function () {

		var result = _linqCore.sum(
			_items,
			function (o) { return o.age; });

		var expected = 10;

		expect(result).toEqual(expected);
	});

});