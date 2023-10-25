/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = [1, 2, 3, 1, 3, 4, 4, 5];
});

test("Returns unique items", function () {

	let result = _linqCore.distinct(_items);
	let expected = [1, 2, 3, 4, 5];

	expect(result.length).toEqual(5);
	expect(result).toEqual(expected);
});
