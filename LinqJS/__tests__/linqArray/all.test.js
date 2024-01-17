/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {
	_items = new linqArray([1, 2, 3, 4, 5, 6, 7, 8]);
});

test("Returns true when all match", function () {

	let result = _items.all(
		function (i) { return i <= 8; });

	const expected = true;

	expect(result).toEqual(expected);
});

test("Returns true when array is empty", function () {

	let result = new linqArray().all(
		function (i) { return i <= 8; });

	const expected = true;

	expect(result).toEqual(expected);
});

test("Returns false when not all match", function () {

	let result = _items.all(
		function (i) { return i <= 7; });

	const expected = false;

	expect(result).toEqual(expected);
});
