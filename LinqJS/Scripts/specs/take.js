/// <reference path="../_references.js" />



	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = ["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"];
	});

	test("Returns a specified number of contiguous elements from the start of a list - count == -1.", function () {

		var result = _linqCore.take(_items, -1);
		var expected = [];

		expect(result).toEqual(expected);
	});

	test("Returns a specified number of contiguous elements from the start of a list - count == 0.", function () {

		var result = _linqCore.take(_items, 0);
		var expected = [];

		expect(result).toEqual(expected);
	});

	test("Returns a specified number of contiguous elements from the start of a list - count == 1.", function () {

		var result = _linqCore.take(_items, 1);
		var expected = ["Foo"];

		expect(result).toEqual(expected);
	});

	test("Returns a specified number of contiguous elements from the start of a list - count > list length.", function () {

		var result = _linqCore.take(_items, 100);
		var expected = ["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"];

		expect(result).toEqual(expected);
	});
