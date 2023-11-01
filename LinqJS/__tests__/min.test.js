/// <reference path="../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../Scripts/linqJs/linq-core');

/** @type {linqJs.linqCore} */
let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = [1, 1, 2, 5, 4, 5, 5, 2, 2];
});

test("Returns the minimum value in a list", function () {

	let result = _linqCore.min(_items);
	let expected = 1;

	expect(result).toEqual(expected);
});
