/// <reference path="../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = [1, 2, 3];
});

test("Returns false when list does not contain value", function () {

	let result = _linqCore.contains(_items, 4);

	expect(result).toBeFalsy();
});

test("Returns true when list does contain value", function () {

	let result = _linqCore.contains(_items, 2);

	expect(result).toBeTruthy();
});
