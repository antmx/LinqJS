/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {

	_items = new linqArray([1, 2, 3]);
});

test("Returns false when list does not contain value", function () {

	let result = _items.contains(4);

	expect(result).toBeFalsy();
});

test("Returns true when list does contain value", function () {

	let result = _items.contains(2);

	expect(result).toBeTruthy();
});

test("Returns true when list does contain value and comparer function applied", function () {

	let comparerFn = (first, second) => first.toLowerCase() === second.toLowerCase();

	let items = new linqArray(["Foo", "Bar"]);
	let result = items.contains("foo", comparerFn);

	expect(result).toBeTruthy();
});

test("Returns false when list does NOT contain value and comparer function applied", function () {

	let comparerFn = (first, second) => first.toLowerCase() === second.toLowerCase();

	let items = new linqArray(["Foo", "Bar"]);
	let result = items.contains("baz", comparerFn);

	expect(result).toBeFalsy();
});

test("Returns false when list does NOT contain value and comparer function NOT applied", function () {


	let items = new linqArray(["Foo", "Bar"]);
	let result = items.contains("foo");

	expect(result).toBeFalsy();
});
