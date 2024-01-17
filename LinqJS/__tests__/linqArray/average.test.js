/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {
	_items = new linqArray([2, 4, 6, 8]);
});

test("Calculates the average of the items", function () {

	let result = _items.average();

	let expected = 5;

	expect(expected).toEqual(result);
});

test("Calculates the average of the items after transforming each", function () {

	let result = _items.average(
		function (i) { return i * 10; });

	let expected = 50;

	expect(expected).toEqual(result);
});
