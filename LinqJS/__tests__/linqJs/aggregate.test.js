/// <reference path="../../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {

	_linqCore = new linqCoreModule();
	_items = [1, 2, 3, 4, 5, 6, 7, 8];
});

test("Combines the result of applying the predicate function to each item", function () {

	let aggregateResult = _linqCore.aggregate(
		_items,
		function (result, current) {
			if (current % 2 === 0)
				return result + current;
			else
				return result;
		});

	let expected = 2 + 4 + 6 + 8;

	expect(expected).toEqual(aggregateResult);
});

test("Combines the result of applying the predicate function to each item", function () {

	let chars = ["a", "b", "c", "d"];

	let aggregateResult = _linqCore.aggregate(
		chars,
		function (result, current) {
			return result !== null ? result + ',' + current : current;
		});

	let expected = "a,b,c,d";

	expect(expected).toEqual(aggregateResult);
});
