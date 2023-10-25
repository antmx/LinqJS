/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = [
		{ name: "foo", age: 2, number: "two" },
		{ name: "bar", age: 4, number: "four" },
		{ name: "baz", age: 1, number: "one" },
		{ name: "qux", age: 3, number: "three" }];
});

test("Computes the sum of a list of values.", function () {

	let items = [1, 3, 2, 4, 5, 0];

	let result = _linqCore.sum(
		items);

	let expected = 15;

	expect(result).toEqual(expected);
});

test("Computes the sum of a list of values that are obtained by invoking a transform function on each element of a list.", function () {

	let result = _linqCore.sum(
		_items,
		function (o) { return o.age; });

	let expected = 10;

	expect(result).toEqual(expected);
});
