/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = ["apple", "banana", "mango", "orange", "passionfruit", "grape"];
});

test("Returns elements from a list as long as a specified condition is true.", function () {

	let result = _linqCore.takeWhile(_items, function (o) { return o != "orange" });
	let expected = ["apple", "banana", "mango"];

	expect(result).toEqual(expected);
});

test("Returns elements from a list as long as a specified condition is true, passing the each item's index to the predicate function.", function () {

	let result = _linqCore.takeWhile(_items, function (o, i) { return i < 4; });
	let expected = ["apple", "banana", "mango", "orange"];

	expect(result).toEqual(expected);
});
