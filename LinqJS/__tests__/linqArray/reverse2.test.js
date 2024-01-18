/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

beforeEach(function () {
});

test("Returns empty list when when list is empty", function () {

	let arr = new linqArray();
	let result = arr.reverse2();

	let expected = [];

	expect(result).toEqual(expected);
});

test("Returns list reversed", function () {

	let arr = new linqArray(['a', 1, 'b', 2, 'c', 3]);
	let result = arr.reverse2();

	let expected = [3, 'c', 2, 'b', 1, 'a'];

	expect(result).toEqual(expected);
});
