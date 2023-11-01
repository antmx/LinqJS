/// <reference path="../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = [1, 2, 3];
});

test("Returns default value when list is empty", function () {

	let result = _linqCore.defaultIfEmpty([], 1);
	let expected = [1];

	expect(result.length).toEqual(1);
	expect(result).toEqual(expected);
});

test("Returns list when list is not empty", function () {

	let result = _linqCore.defaultIfEmpty(_items, 1);
	let expected = _items;

	expect(result.length).toEqual(3);
	expect(result).toEqual(expected);
});
