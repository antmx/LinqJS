/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {
	_items = new linqArray([1, 2, 3, 4, 5, 6, 7, 8]);
});

test("Returns last item", function () {
	let result = _items.last();

	let expected = 8;

	expect(result).toEqual(expected);
});

test("Returns last matching item", function () {
	let result = _items.last(
		function (i) { return i < 7; });

	let expected = 6;

	expect(result).toEqual(expected);
});
