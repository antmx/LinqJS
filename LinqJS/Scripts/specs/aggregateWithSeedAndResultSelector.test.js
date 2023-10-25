/// <reference path="../_references.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();
	_items = [1, 2, 3, 4, 5, 6, 7, 8];
});

test("Combines the result of applying the lambda to each item then applying result selector", function () {

	const seed = 10;

	let aggregateResult = _linqCore.aggregateWithSeedAndResultSelector(
		_items,
		function (result, current) {
			if (current % 2 == 0)
				return result + current;
			else
				return result;
		},
		seed,
		function (result) {
			return result / 2;
		});

	let expected = (2 + 4 + 6 + 8 + seed) / 2;

	expect(expected).toEqual(aggregateResult);
});