/// <reference path="../_references.js" />

describe("linqCore.orderBy", function () {

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

	it("Sorts the elements of a sequence in ascending order.", function () {

		var items = [1, 3, 2, 4, 5, 0];

		var result = _linqCore.orderBy(
			items);

		var expected = [0, 1, 2, 3, 4, 5];

		expect(result).toEqual(expected);
	});

	it("Sorts the elements of a sequence in ascending order according to a key.", function () {

		var result = _linqCore.orderBy(
			_items,
			function (o) { return o.age; });

		var expected = [
			{ name: "baz", age: 1, number: "one" },
			{ name: "foo", age: 2, number: "two" },
			{ name: "qux", age: 3, number: "three" },
			{ name: "bar", age: 4, number: "four" }];

		expect(result).toEqual(expected);
	});

	it("Sorts the elements of a sequence in ascending order according to a key and string comparer function.", function () {

		var result = _linqCore.orderBy(
			_items,
			function (o) { return o.number; },
			function (a, b) { return a.localeCompare(b); });

		var expected = [
			{ name: "bar", age: 4, number: "four" },
			{ name: "baz", age: 1, number: "one" },
			{ name: "qux", age: 3, number: "three" },
			{ name: "foo", age: 2, number: "two" }];

		expect(result).toEqual(expected);
	});

	it("Sorts the elements of a sequence in ascending order according to a key and int comparer function.", function () {

		var result = _linqCore.orderBy(
			_items,
			function (o) { return o.number; },
			function (a, b) { return a.length - b.length; });

		var expected = [
			{ name: "foo", age: 2, number: "two" },
			{ name: "baz", age: 1, number: "one" },
			{ name: "bar", age: 4, number: "four" },
			{ name: "qux", age: 3, number: "three" }];

		expect(result).toEqual(expected);
	});

});