/// <reference path="../../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_items = ["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"];
});

test("Returns a specified number of contiguous elements from the start of a list - count == -1.", function () {

	let result = _linqCore.take(_items, -1);
	let expected = [];

	expect(result).toEqual(expected);
});

test("Returns a specified number of contiguous elements from the start of a list - count == 0.", function () {

	let result = _linqCore.take(_items, 0);
	let expected = [];

	expect(result).toEqual(expected);
});

test("Returns a specified number of contiguous elements from the start of a list - count == 1.", function () {

	let result = _linqCore.take(_items, 1);
	let expected = ["Foo"];

	expect(result).toEqual(expected);
});

test("Returns a specified number of contiguous elements from the start of a list - count > list length.", function () {

	let result = _linqCore.take(_items, 100);
	let expected = ["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"];

	expect(result).toEqual(expected);
});
