/// <reference path="../../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();
	_items = [1, 2, 3, 4, 5, 6, 7, 8];
});

test("Returns first item", function () {

	let result = _linqCore.firstOrDefault(_items);

	let expected = 1;

	expect(result).toEqual(expected);
});

it("Returns first matching item", function () {
	let result = _linqCore.firstOrDefault(
		_items,
		function (i) { return i > 3; });

	let expected = 4;

	expect(result).toEqual(expected);
});

test("Returns default item", function () {
	let result = _linqCore.firstOrDefault(
		_items,
		function (i) { return i > 10; },
		-1);

	let expected = -1;

	expect(result).toEqual(expected);
});
