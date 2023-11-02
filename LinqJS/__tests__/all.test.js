/// <reference path="../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();
	_items = [1, 2, 3, 4, 5, 6, 7, 8];
});

test("Returns true when all match", function () {
	let result = _linqCore.all(
		_items,
		function (i) { return i <= 8; });

	const expected = true;

	expect(result).toEqual(expected);
});

test("Returns true when array is empty", function () {
	let result = _linqCore.all(
		[],
		function (i) { return i <= 8; });

	const expected = true;

	expect(result).toEqual(expected);
});

test("Returns false when not all match", function () {
	
	let result = _linqCore.all(
		_items,
		function (i) { return i <= 7; });

	const expected = false;

	expect(result).toEqual(expected);
});
