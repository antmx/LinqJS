/// <reference path="../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = [1, 1, 2, 5, 4, 5];
});

test("Returns the maximum value in a list", function () {

	let result = _linqCore.max(_items);
	let expected = 5;

	expect(result).toEqual(expected);
});
