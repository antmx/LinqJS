/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {

	_items = new linqArray([
		{ name: "foo", age: 2, number: "two" },
		{ name: "bar", age: 4, number: "four" },
		{ name: "baz", age: 1, number: "one" },
		{ name: "qux", age: 3, number: "three" }]);
});

test("Computes the sum of a list of values.", function () {

	let items = new linqArray([1, 3, 2, 4, 5, 0]);

	let result = items.sum();

	let expected = 15;

	expect(result).toEqual(expected);
});

test("Computes the sum of a list of values that are obtained by invoking a transform function on each element of a list.", function () {

	let result = _items.sum(
		function (o) { return o.age; });

	let expected = 10;

	expect(result).toEqual(expected);
});
