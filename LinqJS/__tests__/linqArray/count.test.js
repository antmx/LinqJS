/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {

	_items = new linqArray([1, 2, 3]);
});

test("Returns correct number of items in list", function () {

	let result = _items.count();

	expect(result).toEqual(3);
});

test("Returns zero when empty", function () {

	let emptyArray = new linqArray();
	let result = emptyArray.count();

	expect(result).toEqual(0);
});

test("Sets and returns correct number of items in the list when initially has items", function () {

	let result = _items.count(2);

	expect(result).toEqual(2);
});

test("Sets and returns correct number of items in the list when initially empty", function () {

	let emptyArray = new linqArray();
	let result = emptyArray.count(3);

	expect(result).toEqual(3);
});
