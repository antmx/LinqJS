/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

beforeEach(function () {
});

test("Sets the specified element in the current Array to the specified value - 1D", function () {

	let items = new linqArray();
	items.setValue("three", 3);
	let result = items[3];
	let expected = "three";

	expect(result).toEqual(expected);
});

test("Sets the specified element in the current Array to the specified value - 2D", function () {

	let items = new linqArray([["a", "b"], ["c", "d"], ["e", "f"], ["g", "h"]]); // 2D array
	items.setValue("three,one", [3, 1]);
	let result = items[3][1];
	let expected = "three,one";

	expect(result).toEqual(expected);
});
