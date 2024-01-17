/// <reference path="../../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../../Scripts/linqJs/linq-core');

let _linqCore;

beforeEach(function () {
	_linqCore = new linqCoreModule();
});

test("Throws error when list is null", function () {

	expect(function () { _linqCore.reverse(null); }).toThrow(new Error("Array must not be null"));
});

test("Returns empty list when when list is empty", function () {

	let result = _linqCore.reverse([]);

	let expected = [];

	expect(result).toEqual(expected);
});

test("Returns list reversed", function () {

	let result = _linqCore.reverse(['a', 1, 'b', 2, 'c', 3]);

	let expected = [3, 'c', 2, 'b', 1, 'a'];

	expect(result).toEqual(expected);
});
