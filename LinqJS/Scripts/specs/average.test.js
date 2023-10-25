/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();
	_items = [2, 4, 6, 8];
});

test("Calculates the average of the items", function () {

	let result = _linqCore.average(_items);

	let expected = 5;

	expect(expected).toEqual(result);
});
