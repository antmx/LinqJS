/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {

	_items = new linqArray([1, 2, 3, 1, 3, 4, 4, 5]);
});

test("Returns unique items", function () {

	let result = _items.distinct();
	let expected = [1, 2, 3, 4, 5];

	expect(result.length).toEqual(5);
	expect(result).toEqual(expected);
});
