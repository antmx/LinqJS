/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

beforeEach(function () {
});

test("Throws error when list is empty", function () {

	let arr = new linqArray();

	expect(function () { arr.single() }).toThrow(new Error("Array must contain at least one item"));
});

test("Throws error when no match", function () {

	let arr = new linqArray([1, 2, 3]);

	expect(function () {
		arr.single(
			function (o) { return o > 4; });
	}).toThrow(new Error("No match found"));
});

test("Throws error when more than 1 match", function () {

	let arr = new linqArray([1, 2, 3, 4, 5, 6]);

	expect(function () {
		arr.single(
			function (o) { return o > 4; });
	}).toThrow(new Error("More than 1 match found"));
});

test("Returns first item of string array", function () {

	let arr = new linqArray(["foo"]);

	expect(arr.single()).toEqual("foo");
});

// test("Returns first item of int array", function () {

// 	let arr = new linqArray([1]);

// 	expect(arr.single()).toEqual(1);
// });

test("Returns first matching item", function () {

	let arr = new linqArray([1, 2, 3]);

	expect(arr.single(
		function (o) { return o > 2; })).toEqual(3);
});
