/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {
	_items = new linqArray([1, 1, 2, 5, 4, 5, 5, 2, 2]);
});

test("Returns the minimum value in a list", function () {

	let result = _items.min();
	let expected = 1;

	expect(result).toEqual(expected);
});
