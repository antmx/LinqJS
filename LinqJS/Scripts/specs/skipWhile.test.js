/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = ["apple", "banana", "mango", "orange", "passionfruit", "grape"];
});

test("Bypasses elements in a list as long as a specified condition is true and then returns the remaining elements.", function () {

	let result = _linqCore.skipWhile(_items, function (o) { return o != "orange"; });
	let expected = ["orange", "passionfruit", "grape"];

	expect(result).toEqual(expected);
});

test("Bypasses elements in a list as long as a specified condition is true and then returns the remaining elements, passing each element's index to the predicate function.", function () {

	let result = _linqCore.skipWhile(_items, function (o, i) { return i < 4; });
	let expected = ["passionfruit", "grape"];

	expect(result).toEqual(expected);
});
