/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {
	_items = new linqArray([1, 2, 3, 4, 5, 6, 7, 8]);
});

test("Returns first item", function () {
	let result = _items.first();

	let expected = 1;

	expect(result).toEqual(expected);
});

test("Returns first matching item", function () {
	let result = _items.first(
		function (i) { return i > 3 });

	let expected = 4;

	expect(result).toEqual(expected);
});

test("Throws error on empty array", function () {

	let emptyArray = new linqArray();

	expect(function () {

		emptyArray.first();

	}).toThrow("Array must contain at least one item");
});

test("Throws error when no item matches", function () {

	expect(function () {

		_items.first((itm) => itm > 8);

	}).toThrow("Array contains no matching items");
});
