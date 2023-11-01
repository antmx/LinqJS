/// <reference path="../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();
	_items = [1, 2, 3, 4, 5, 6, 7, 8];
});

test("Returns last item", function () {
	let result = _linqCore.last(
		_items);

	let expected = 8;

	expect(result).toEqual(expected);
});

test("Returns last matching item", function () {
	let result = _linqCore.last(
		_items,
		function (i) { return i < 7; });

	let expected = 6;

	expect(result).toEqual(expected);
});
