/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {

	_items = new linqArray([1, 2, 3, 4, 5]);
});

test("Returns the item at the specified index", function () {

	let result = _items.elementAt(2);
	let expected = 3;

	expect(result).toEqual(expected);
});
