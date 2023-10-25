/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = [1, 2, 3, 4, 5];
});

test("Returns the item at the specified index", function () {

	let result = _linqCore.elementAt(_items, 2);
	let expected = 3;

	expect(result).toEqual(expected);
});
