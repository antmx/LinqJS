﻿/// <reference path="../_references.js" />



	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = [
			{ name: "foo", age: 2, number: "two" },
			{ name: "bar", age: 4, number: "four" },
			{ name: "baz", age: 1, number: "one" },
			{ name: "qux", age: 3, number: "three" }];
	});

	test("Sorts the elements of a sequence in descending order.", function () {

		var items = [1, 3, 2, 4, 5, 0];

		var result = _linqCore.orderByDescending(
			items);

		var expected = [5, 4, 3, 2, 1, 0];

		expect(result).toEqual(expected);
	});

	test("Sorts the elements of a sequence in descending order according to a key.", function () {

		var result = _linqCore.orderByDescending(
			_items,
			function (o) { return o.age; });

		var expected = [
			{ name: "bar", age: 4, number: "four" },
			{ name: "qux", age: 3, number: "three" },
			{ name: "foo", age: 2, number: "two" },
			{ name: "baz", age: 1, number: "one" }];

		expect(result).toEqual(expected);
	});

	test("Sorts the elements of a sequence in descending order according to a key and string comparer function.", function () {

		var result = _linqCore.orderByDescending(
			_items,
			function (o) { return o.number; },
			function (a, b) { return a.localeCompare(b); });

		var expected = [
			{ name: "foo", age: 2, number: "two" },
			{ name: "qux", age: 3, number: "three" },
			{ name: "baz", age: 1, number: "one" },
			{ name: "bar", age: 4, number: "four" }];

		expect(result).toEqual(expected);
	});

	test("Sorts the elements of a sequence in descending order according to a key and int comparer function.", function () {

		var result = _linqCore.orderByDescending(
			_items,
			function (o) { return o.number; },
			function (a, b) { return a.length - b.length; });

		var expected = [
			{ name: "qux", age: 3, number: "three" },
			{ name: "bar", age: 4, number: "four" },
			{ name: "baz", age: 1, number: "one" },
			{ name: "foo", age: 2, number: "two" }];

		expect(result).toEqual(expected);
	});
