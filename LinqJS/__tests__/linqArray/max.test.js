/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {
	_items = new linqArray([1, 1, 2, 5, 4, 5]);
});

test("Returns the maximum value in a list", function () {

	let result = _items.max();
	let expected = 5;

	expect(result).toEqual(expected);
});
