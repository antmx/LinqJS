/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

/**
 * @type {linqArray}
 */
let _additionalItems;

beforeEach(function () {

	_items =new linqArray( [1, 2, 3]);
	_additionalItems = [4, 5, 6];
});

test("Combines 2 lists into 1", function () {

	let result = _items.concat(_additionalItems);

	let expected = [1, 2, 3, 4, 5, 6];

	expect(result.length).toEqual(6);

	result.forEachItem(function (indexInArray, valueOfElement) {

		expect(valueOfElement).toEqual(expected[indexInArray]);
	});
});