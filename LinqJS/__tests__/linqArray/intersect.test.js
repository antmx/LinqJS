/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _firstItems;

/**
 * @type {linqArray}
 */
let _secondItems;

beforeEach(function () {

	_firstItems = new linqArray([1, 1, 2, 3, 4, 5]);
	_secondItems = [1, 3, 5, 7];
});

test("Produces the set intersection of two lists", function () {

	let result = _firstItems.intersect(_secondItems);
	let expected = [1, 3, 5];

	expect(result).toEqual(expected);
});
