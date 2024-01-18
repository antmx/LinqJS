/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

test("Returns non-null default value when no match", function () {

	let arr = new linqArray([1, 2, 3]);

	let result = arr.singleOrDefault(
		function (o) { return o > 4; },
		0);

	expect(result).toEqual(0);
});

test("Returns null default value when no match", function () {

	let arr = new linqArray([1, 2, 3]);

	let result = arr.singleOrDefault(
		function (o) { return o > 4; },
		null);

	expect(result).toEqual(null);
});

test("Throws error when more than 1 match", function () {

	let arr = new linqArray([1, 2, 3, 4, 5, 6]);

	expect(function () {
		arr.singleOrDefault(
			function (o) { return o > 4; },
			null)
	}).toThrow(new Error("More than 1 match found"));
});

test("Returns first item", function () {

	let arr = new linqArray(["foo"]);
	let result = arr.singleOrDefault(undefined, 0);

	expect(result).toEqual("foo");
});

test("Returns first matching item", function () {

	let arr = new linqArray([1, 2, 3]);

	expect(arr.singleOrDefault(
		function (o) { return o > 2; },
		0)).toEqual(3);
});
