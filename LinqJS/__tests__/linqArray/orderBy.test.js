/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {

	_items = new linqArray([
		{ name: "foo", age: 2, number: "two" },
		{ name: "bar", age: 4, number: "four" },
		{ name: "baz", age: 1, number: "one" },
		{ name: "qux", age: 3, number: "three" }]);
});

test("Sorts the elements of a sequence in ascending order.", function () {

	let items = new linqArray([1, 3, 2, 4, 5, 0]);

	let result = items.orderBy();

	let expected = [0, 1, 2, 3, 4, 5];

	expect(result).toEqual(expected);
});

test("Sorts the elements of a sequence in ascending order according to a key.", function () {

	let result = _items.orderBy(
		function (o) { return o.age; });

	let expected = [
		{ name: "baz", age: 1, number: "one" },
		{ name: "foo", age: 2, number: "two" },
		{ name: "qux", age: 3, number: "three" },
		{ name: "bar", age: 4, number: "four" }];

	expect(result).toEqual(expected);
});

test("Sorts the elements of a sequence in ascending order according to a key and string comparer function.", function () {

	let result = _items.orderBy(
		function (o) { return o.number; },
		function (a, b) { return a.localeCompare(b); });

	let expected = [
		{ name: "bar", age: 4, number: "four" },
		{ name: "baz", age: 1, number: "one" },
		{ name: "qux", age: 3, number: "three" },
		{ name: "foo", age: 2, number: "two" }];

	expect(result).toEqual(expected);
});

test("Sorts the elements of a sequence in ascending order according to a key and int comparer function.", function () {

	let result = _items.orderBy(
		function (o) { return o.number; },
		function (a, b) { return a.length - b.length; });

	let expected = [
		{ name: "foo", age: 2, number: "two" },
		{ name: "baz", age: 1, number: "one" },
		{ name: "bar", age: 4, number: "four" },
		{ name: "qux", age: 3, number: "three" }];

	expect(result).toEqual(expected);
});
