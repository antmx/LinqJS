/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {
	_items = new linqArray( [1, 2, 3, 4, 5, 6, 7, 8]);
});

test("Finds matching items", function () {

	let result = _items.where(function (i) { return i % 2 == 0; })			;
	let expected = [2, 4, 6, 8];

	expect(result.length).toEqual(4);

	result.forEachItem(function (indexInArray, valueOfElement) {

		expect(valueOfElement).toEqual(expected[indexInArray]);
	});
});
