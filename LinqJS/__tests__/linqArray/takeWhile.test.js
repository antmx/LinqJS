/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;


beforeEach(function () {

	_items = new linqArray(["apple", "banana", "mango", "orange", "passionfruit", "grape"]);
});

test("Returns elements from a list as long as a specified condition is true.", function () {

	let result = _items.takeWhile(function (o) { return o != "orange" });
	let expected = ["apple", "banana", "mango"];

	expect(result).toEqual(expected);
});

test("Returns elements from a list as long as a specified condition is true, passing the each item's index to the predicate function.", function () {

	let result = _items.takeWhile((val, idx) => idx < 4);
	let expected = ["apple", "banana", "mango", "orange"];

	expect(result).toEqual(expected);
});
