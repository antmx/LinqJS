/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
//let _items;

beforeEach(function () {
	//_items = new linqArray([1, 1, 2, 5, 4, 5, 5, 2, 2]);
});

test("No parameter returns empty linqArray", function () {

	let result = new linqArray();

	let typeStr = Object.prototype.toString.call(result);
	expect(typeStr).toEqual("[object Array]");

	let expected = 0;

	expect(result.length).toEqual(expected);
});

test("Empty array parameter returns empty linqArray", function () {

	let result = new linqArray([]);

	let typeStr = Object.prototype.toString.call(result);
	expect(typeStr).toEqual("[object Array]");

	let expected = 0;

	expect(result.length).toEqual(expected);
});

test("Populated array parameter returns populated linqArray", function () {

	let result = new linqArray([1,2,3]);

	let typeStr = Object.prototype.toString.call(result);
	expect(typeStr).toEqual("[object Array]");

	let expected = 3;

	expect(result.length).toEqual(expected);
});

test("Empty string parameter returns empty linqArray", function () {

	let result = new linqArray("");

	let typeStr = Object.prototype.toString.call(result);
	expect(typeStr).toEqual("[object Array]");

	let expected = 0;

	expect(result.length).toEqual(expected);
});

test("Populated string parameter returns populated linqArray", function () {

	let result = new linqArray("abc");

	let typeStr = Object.prototype.toString.call(result);
	expect(typeStr).toEqual("[object Array]");

	let expected = 3;

	expect(result.length).toEqual(expected);
});
