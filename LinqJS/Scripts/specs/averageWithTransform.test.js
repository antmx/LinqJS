/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();
	_items = [2, 4, 6, 8];
});

test("Calculates the average of the items after transforming each", function () {

	let result = _linqCore.averageWithTransform(
		_items,
		function (i) { return i * 10; });

	let expected = 50;

	expect(expected).toEqual(result);
});
