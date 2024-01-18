/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {

	_items = new linqArray([59, 82, 70, 56, 92, 98, 85]);
});

test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == -1", function () {

	let result = _items.skip(-1);
	let expected = [];

	expect(result).toEqual(expected);
});

test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == 0.", function () {

	let result = _items.skip(0);
	let expected = [];

	expect(result).toEqual(expected);
});

test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == 1.", function () {

	let result = _items.skip(1);
	let expected = [82, 70, 56, 92, 98, 85];

	expect(result).toEqual(expected);
});

test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count > list length.", function () {

	let result = _items.skip(100);
	let expected = [];

	expect(result).toEqual(expected);
});
