/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {
	_items = new linqArray([1, 2, 3, 4, 5, 6, 7, 8]);
});

test("Returns first item", function () {

	let result = _items.firstOrDefault();

	let expected = 1;

	expect(result).toEqual(expected);
});

it("Returns first matching item", function () {
	let result = _items.firstOrDefault(
		function (i) { return i > 3; });

	let expected = 4;

	expect(result).toEqual(expected);
});

test("Returns default item", function () {
	let result = _items.firstOrDefault(
		function (i) { return i > 10; },
		-1);

	let expected = -1;

	expect(result).toEqual(expected);
});
