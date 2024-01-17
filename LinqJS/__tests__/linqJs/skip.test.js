/// <reference path="../../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = [59, 82, 70, 56, 92, 98, 85];
});

test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == -1", function () {

	let result = _linqCore.skip(_items, -1);
	let expected = [];

	expect(result).toEqual(expected);
});

test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == 0.", function () {

	let result = _linqCore.skip(_items, 0);
	let expected = [];

	expect(result).toEqual(expected);
});

test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == 1.", function () {

	let result = _linqCore.skip(_items, 1);
	let expected = [82, 70, 56, 92, 98, 85];

	expect(result).toEqual(expected);
});

test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count > list length.", function () {

	let result = _linqCore.skip(_items, 100);
	let expected = [];

	expect(result).toEqual(expected);
});
