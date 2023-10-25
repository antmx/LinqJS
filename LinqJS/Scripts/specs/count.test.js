/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = [1, 2, 3];
});

test("Returns correct number of items in list", function () {

	let result = _linqCore.count(_items);

	expect(result).toEqual(3);
});
