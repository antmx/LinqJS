/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {

	_items = new linqArray( [1, 2, 3, 4, 5, 6, 7, 8])		;
});

test("Combines the result of applying the predicate function to each item", function () {

	let aggregateResult = _items.aggregate(
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

	let chars =new linqArray( ["a", "b", "c", "d"]);

	let aggregateResult = chars.aggregate(
		function (result, current) {
			return result !== null ? result + ',' + current : current;
		});

	let expected = "a,b,c,d";

	expect(expected).toEqual(aggregateResult);
});

test("Combines the result of applying the predicate function to each item", function () {

	const seed = 10;

	let aggregateResult = _items.aggregate(
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

test("Combines the result of applying the predicate function to each item then applying result selector", function () {

	const seed = 10;

	let aggregateResult = _items.aggregate(
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
