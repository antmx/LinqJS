/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();
	_items = [1, 2, 3, 4, 5, 6, 7, 8];
});

test("Finds matching items", function () {
	let result = _linqCore.where(
		_items,
		function (i) { return i % 2 == 0; });

	let expected = [2, 4, 6, 8];

	expect(result.length).toEqual(4);

	_linqCore.forEach(result, function (indexInArray, valueOfElement) {

		expect(valueOfElement).toEqual(expected[indexInArray]);
	});
});
