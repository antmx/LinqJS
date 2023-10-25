/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;

beforeEach(function () {
	_linqCore = new linqCoreModule();
});

test("Confirms an empty array", function () {

	let result = _linqCore.isArray([])

	expect(result).toEqual(true);
});

test("Confirms a non-empty array", function () {

	let result = _linqCore.isArray([1, 2, 3]);

	expect(result).toEqual(true);
});

test("Confirms a non-empty array of arrays", function () {

	let result = _linqCore.isArray([[1, 2, 3], 2, 3]);

	expect(result).toEqual(true);
});

test("Confirms a string is not an array", function () {

	let result = _linqCore.isArray("foo");

	expect(result).toEqual(false);
});

test("Confirms an object is not an array", function () {

	let result = _linqCore.isArray({ foo: "bar", baz: [] });

	expect(result).toEqual(false);
});

test("Confirms a number is not an array", function () {

	let result = _linqCore.isArray(123);

	expect(result).toEqual(false);
});

test("Confirms null is not an array", function () {

	let result = _linqCore.isArray(null);

	expect(result).toEqual(false);
});

test("Confirms undefined is not an array", function () {

	let result = _linqCore.isArray(undefined);

	expect(result).toEqual(false);
});
