/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {

	_items = new linqArray(["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"]);
});

test("Returns a specified number of contiguous elements from the start of a list - count == -1.", function () {

	let result = _items.take(-1);
	let expected = [];

	expect(result).toEqual(expected);
});

test("Returns a specified number of contiguous elements from the start of a list - count == 0.", function () {

	let result = _items.take(0);
	let expected = [];

	expect(result).toEqual(expected);
});

test("Returns a specified number of contiguous elements from the start of a list - count == 1.", function () {

	let result = _items.take(1);
	let expected = ["Foo"];

	expect(result).toEqual(expected);
});

test("Returns a specified number of contiguous elements from the start of a list - count > list length.", function () {

	let result = _items.take(100);
	let expected = ["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"];

	expect(result).toEqual(expected);
});

test("Returns the contiguous elements in a range.", function () {

	let result = _items.take([1, 3]);
	let expected = ["Bar", "Baz", "Qux"];

	expect(result).toEqual(expected);
});
