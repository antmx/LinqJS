/// <reference path="../../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();
	_items = [1, 2, 3, 4, 5, 6, 7, 8];
});

test("Combines the result of applying the predicate function to each item", function () {

	const seed = 10;

	let aggregateResult = _linqCore.aggregateWithSeed(
		_items,
		function (result, current) {
			if (current % 2 == 0)
				return result + current;
			else
				return result;
		},
		seed);

	let expected = 2 + 4 + 6 + 8 + seed;

	expect(expected).toEqual(aggregateResult);
});
